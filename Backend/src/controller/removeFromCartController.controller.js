const cartModel = require("../models/cart.model");
const removeFromCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { sareeId } = req.params;

    // finding cart using userId

    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      res.status(400).json({ error: "No cart found" });
      return;
    }

    // agar cart exist karta hai >>>
    const existingItem = cart.items.find(
      (item) => item.sareeId.toString() === sareeId,
    );
    if (existingItem) {
      cart.items = cart.items.filter(
        (item) => item.sareeId.toString() !== sareeId,
      );
      await cart.save();

      res.status(200).json({ message: "Saree removed from the cart" });
      return;
    }

    if (!existingItem) {
      res.status(400).json({ message: "Cant remove sorry" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in removeFromCartController" });
  }
};
module.exports = removeFromCartController;