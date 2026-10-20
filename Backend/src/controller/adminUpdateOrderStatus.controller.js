const orderModel = require("../models/orders.model");

const adminUpdateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;

    // Allowed status values
    const allowedStatus = ["Confirmed", "Shipped", "Delivered"];

    // Validate the provided status
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status option" });
    }

    // Define allowed transitions
    const allowedTransitions = {
      Pending: ["Confirmed"],
      Confirmed: ["Shipped"],
      Shipped: ["Delivered"],
      Delivered: [],
    };

    // Find the existing order
    const order = await orderModel.findById(orderId);

    // Check whether the order exists
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check whether the transition is allowed
    if (!allowedTransitions[order.status].includes(status)) {
      return res.status(400).json({
        error: `Cannot change status from ${order.status} to ${status}`,
      });
    }

    // Update the status
    order.status = status;

    // Save the updated order
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error occurred in adminUpdateOrderStatus controller",
    });
  }
};

module.exports = adminUpdateOrderStatus;