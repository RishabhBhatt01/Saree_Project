const orderModel = require("../models/orders.model");

const getAdminOrderController = async (req, res) => {
  try {
    // Get and validate page number
    const page = Number(req.query.page) || 1;
    const limit = 10;

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({
        error: "Invalid page number",
      });
    }

    // Calculate documents to skip
    const skip = (page - 1) * limit;

    // Fetch orders and count total orders
    const [orders, totalOrders] = await Promise.all([
      orderModel
        .find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      orderModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    // Handle a page beyond the available range
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