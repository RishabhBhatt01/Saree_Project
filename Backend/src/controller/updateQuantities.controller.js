const cartModel = require("../models/cart.model");
const updateQuantitiesController = async (req, res) => {
  try {
    //   1. Get userId from req.userId
    const userId = req.userId;

    // 2. Get sareeId from req.params
    const { sareeId } = req.params;
    // 3. Get quantity from req.body
    const { quantity } = req.body;
    // 4. Find user's cart
    const cart = await cartModel.findOne({
      userId,
    });
    if (!cart) {
      res.status(400).json({
        message: "Can't find cart",
      });
      return;
    }
    // 5. Find that saree inside cart.items
    const existingItem = cart.items.find(
      (item) => item.sareeId.toString() === sareeId,
    );

    if (!existingItem) {
      res.status(400).json({
        message: "first add item to cart",
      });
      return;
    }
    // 6. Change existingItem.quantity
    existingItem.quantity += quantity;
    // 7. Save cart
    await cart.save();
    // 8. Return updated cart
    res.status(200).json({
      message: "Quantities updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error in updateQuantitiesController",
    });
  }
};
module.exports = updateQuantitiesController;
