const cartModel = require("../models/cart.model");
const sareeModel = require("../models/saree.model");
const orderModel = require("../models/orders.model");
const orderController = async (req, res) => {
  try {
    console.log("in controller");

    // Logged-in user
    const userId = req.userId;
    // Find their Cart
    const cart = await cartModel.findOne({ userId });

    // Is cart empty?
    if (!cart || cart.items.length == 0) {
      res.status(400).json({
        message: "Empty or no cart",
      });
      return;
    }

    const orderItems = [];
    let totalAmount = 0;
    // Get saree prices
    for (const item of cart.items) {
      const saree = await sareeModel.findById(item.sareeId);
      if (!saree) {
        res.status(400).json({ message: "can't find the saree" });
        return;
      }
      orderItems.push({
        sareeId: item.sareeId,
        quantity: item.quantity,
        price: saree.price,
      });
    }
    // Calculate totalAmount
    for (const item of orderItems) {
      totalAmount += item.price * item.quantity;
    }

    // Create Order
    const order = await orderModel.create({
      userId,
      items: orderItems,
      totalAmount,
    });

    // Clear Cart
    cart.items = [];
    await cart.save();
    // Send response
    res.status(201).json({
      message: "Order Placed",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "error in order controller",
    });
  }
};

const getOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
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

    const order = await orderModel.findOne({
      userId,
      _id: orderId,
    });

    if (!order) {
      res.status(400).json({ error: "can't find order" });
      return;
    }

    res
      .status(200)
      .json({ message: "fetched single order successfully", order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in getOneOrderController" });
  }
};

module.exports = { orderController, getOrderController, getOneOrderController };
