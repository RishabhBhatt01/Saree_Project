const cartModel = require("../models/cart.model");
const sareeModel = require("../models/saree.model")
const orderController = async (req, res) => {
  // Logged-in user
  const userId = req.userId;
  // Find their Cart
  const cart = cartModel.findOne({userId})

  // Is cart empty?
  if(!cart || cart.items.length == 0){
    res.status(400).json({
      message : "Empty or no cart"
    })
    return
  }

  // Get saree prices
  const saree = sareeModel.findOne({})

  // Create Order
  // Calculate totalAmount
  // Save Order
  // Clear Cart
  // Send response
};
