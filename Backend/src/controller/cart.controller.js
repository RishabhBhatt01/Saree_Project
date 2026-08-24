const userModel = require("../models/user.model");
const sareeModel = require("../models/saree.model");
const cartModel = require("../models/cart.models");

// we came here from authMiddleware
const cartController = async (req, res) => {
  try {
    const userId = req.userId;

    // saree id and quantity will come from frontend
    const { sareeId, quantity } = req.body;
    const qty = Number(quantity)

    // before createing i need to find if a cart exist

    let cart = await cartModel.findOne({
      userId,
    });

    if (!cart) {
      // create a cart
      cart = await cartModel.create({
        userId,
        items: [
          {
            sareeId,
            quantity : qty,
          },
        ],
      });

      res.status(201).json({
        Message: "Cart created",
        cart,
      });

      return;
    }

    const existingItem = cart.items.find(
      (item) => item.sareeId.toString() === sareeId,
    );

    if (existingItem) {
      existingItem.quantity += qty;
      await cart.save();
      res.status(200).json({
        message: "cart saved",
        existingItem,
      });
      return;
    }
    cart.items.push({
      sareeId,
      quantity:qty,
    });

    const updatedCart = await cart.save();
    // yaha se suru karunga
    res.status(200).json({ message: "saved", updatedCart });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

const getCartController = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ userId: req.userId }).populate("items.sareeId");

    if (!cart) {
      res.status(400).json({ messsage: "Empty cart, please add some items" });
      return;
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ messsage: "error in cart controller", cart });
  }
};
module.exports = { cartController ,getCartController};
