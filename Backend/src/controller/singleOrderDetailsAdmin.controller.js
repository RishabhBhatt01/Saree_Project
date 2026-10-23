const orderModel = require("../models/orders.model");

const singleOrderDetailsAdmin = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderModel
      .findById(orderId)
      .populate("userId", "username email")
      .populate("items.sareeId");

    if (!order) {
      return res.status(404).json({ error: "no order found" });
    }
    return res.status(200).json({ message: "fetched successfully", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error in singleOrderDetailsAdmin" });
  }
};

module.exports = singleOrderDetailsAdmin;