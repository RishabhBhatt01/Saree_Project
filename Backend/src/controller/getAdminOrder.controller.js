const orderModel = require("../models/orders.model");
const getAdminOrderController = async (req, res) => {
  try {
    // sending last 5 orders...
    const orders = await orderModel.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      error: "fetched successfully",
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unexpected error in getAdminController" });
  }
};

module.exports = getAdminOrderController;
