const sareeModel = require("../models/saree.model");
const cartModel = require("../models/cart.model");

// Old sarees have no isActive field, so match "not false"
const visible = { isActive: { $ne: false } };

const cartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { sareeId, quantity } = req.body;
    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a whole number of at least 1" });
    }

    // Deleted (hidden) sarees can't be added
    const saree = await sareeModel.findOne({ _id: sareeId, ...visible });
    if (!saree) {
      return res.status(404).json({ message: "Saree not found" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ sareeId, quantity: qty }],
      });
      return res.status(201).json({ Message: "Cart created", cart });
    }

    const existingItem = cart.items.find(
      (item) => item.sareeId.toString() === sareeId,
    );

    if (existingItem) {
      existingItem.quantity += qty;
      await cart.save();
      return res.status(200).json({ message: "cart saved", existingItem });
    }

    cart.items.push({ sareeId, quantity: qty });
    const updatedCart = await cart.save();
    res.status(200).json({ message: "saved", updatedCart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getCartController = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.userId })
      .populate("items.sareeId");

    if (!cart) {
      return res.status(200).json({ cart: { items: [] } });
    }

    // Drop items whose saree was deleted or hidden
    const items = cart.items.filter(
      (item) => item.sareeId && item.sareeId.isActive !== false,
    );

    res.status(200).json({ cart: { ...cart.toObject(), items } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in cart controller" });
  }
};

module.exports = { cartController, getCartController };