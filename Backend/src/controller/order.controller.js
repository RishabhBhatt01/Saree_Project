const crypto = require("crypto");
const cartModel = require("../models/cart.model");
const sareeModel = require("../models/saree.model");
const orderModel = require("../models/orders.model");
const addressModel = require("../models/address.model");
const razorpay = require("../config/razorpay");

// Mark an unpaid order Failed (only once) and give its stock back
const releaseOrder = async (order) => {
  const failed = await orderModel.findOneAndUpdate(
    { _id: order._id, paymentStatus: "Unpaid" },
    { paymentStatus: "Failed" },
    { new: true },
  );
  if (!failed) return false;
  for (const item of failed.items) {
    await sareeModel.updateOne(
      { _id: item.sareeId },
      { $inc: { stock: item.quantity } },
    );
  }
  return true;
};

const orderController = async (req, res) => {
  const reserved = [];
  let order = null;

  const rollbackStock = async () => {
    for (const r of reserved) {
      await sareeModel.updateOne(
        { _id: r.sareeId },
        { $inc: { stock: r.quantity } },
      );
    }
  };

  try {
    const userId = req.userId;

    const cart = await cartModel.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Empty or no cart" });
    }

    const { addressId } = req.body;
    const address = await addressModel.findOne({ _id: addressId, userId });
    if (!address) {
      return res.status(400).json({ message: "Can't find the address" });
    }

    // Remove deleted (hidden) sarees from the cart before buying
    const cartIds = cart.items.map((i) => i.sareeId);
    const activeDocs = await sareeModel
      .find({ _id: { $in: cartIds }, isActive: { $ne: false } })
      .select("_id");
    const activeIds = new Set(activeDocs.map((s) => s._id.toString()));

    if (cart.items.some((i) => !activeIds.has(i.sareeId.toString()))) {
      cart.items = cart.items.filter((i) =>
        activeIds.has(i.sareeId.toString()),
      );
      await cart.save();
      return res.status(400).json({
        message:
          "Some sarees in your cart are no longer available and were removed. Please review your cart.",
      });
    }

    // Release this user's abandoned checkouts so their stock isn't stuck
    const stale = await orderModel.find({ userId, paymentStatus: "Unpaid" });
    for (const o of stale) await releaseOrder(o);

    // Reserve stock atomically, one saree at a time
    const orderItems = [];
    for (const item of cart.items) {
      const saree = await sareeModel.findOneAndUpdate(
        {
          _id: item.sareeId,
          isActive: { $ne: false },
          stock: { $gte: item.quantity },
        },
        { $inc: { stock: -item.quantity } },
        { new: true },
      );
      if (!saree) {
        await rollbackStock();
        return res
          .status(400)
          .json({ message: "Out of Stock: some items are unavailable" });
      }
      reserved.push({ sareeId: item.sareeId, quantity: item.quantity });
      orderItems.push({
        sareeId: item.sareeId,
        quantity: item.quantity,
        price: saree.price,
      });
    }

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    order = await orderModel.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
    });

    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // paise
      currency: "INR",
      receipt: order._id.toString(),
    });

    order.razorpayOrderId = rzpOrder.id;
    await order.save();

    // Cart is NOT cleared here: it is cleared after payment is verified
    res.status(201).json({
      message: "Order created, awaiting payment",
      order,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    try {
      if (order) await releaseOrder(order);
      else await rollbackStock();
    } catch (e) {
      console.log(e);
    }
    res.status(400).json({ message: "Couldn't start payment. Try again." });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const order = await orderModel.findOne({
      userId,
      razorpayOrderId: razorpay_order_id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "Paid") {
      return res.status(200).json({ message: "Already paid", order });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const paid = await orderModel.findOneAndUpdate(
      { _id: order._id, paymentStatus: "Unpaid" },
      { paymentStatus: "Paid", razorpayPaymentId: razorpay_payment_id },
      { new: true },
    );
    if (!paid) {
      return res
        .status(409)
        .json({ message: "This order is no longer awaiting payment." });
    }

    await cartModel.updateOne({ userId }, { $set: { items: [] } });

    res.status(200).json({ message: "Payment successful", order: paid });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error verifying payment" });
  }
};

const cancelPaymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.body;

    const order = await orderModel.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const released = await releaseOrder(order);
    res.status(200).json({
      message: released
        ? "Payment cancelled, stock restored"
        : "Order was not waiting for payment",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error cancelling payment" });
  }
};

const getOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({ userId, paymentStatus: { $nin: ["Unpaid", "Failed"] } })
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "order fetched successfully", orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in getOrderController" });
  }
};

const getOneOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId;

    const order = await orderModel.findOne({ userId, _id: orderId });
    if (!order) {
      return res.status(400).json({ error: "can't find order" });
    }

    res
      .status(200)
      .json({ message: "fetched single order successfully", order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in getOneOrderController" });
  }
};

module.exports = {
  orderController,
  verifyPaymentController,
  cancelPaymentController,
  getOrderController,
  getOneOrderController,
};