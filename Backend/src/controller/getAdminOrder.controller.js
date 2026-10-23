const orderModel = require("../models/orders.model");

// Hide abandoned/failed payments; old orders without paymentStatus still show
const paidFilter = { paymentStatus: { $nin: ["Unpaid", "Failed"] } };

const getAdminOrderController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({
        error: "Invalid page number",
      });
    }

    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      orderModel
        .find(paidFilter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      orderModel.countDocuments(paidFilter),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    if (page > totalPages && totalPages > 0) {
      return res.status(404).json({
        error: "Page not found",
        totalPages,
      });
    }

    return res.status(200).json({
      message: "fetched successfully",
      orders,
      currentPage: page,
      totalOrders,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "unexpected error in getAdminController",
    });
  }
};

module.exports = getAdminOrderController;