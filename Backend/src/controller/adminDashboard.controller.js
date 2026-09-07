const orderModel = require("../models/orders.model");
const userModel = require("../models/user.model");
const sareeModel = require("../models/saree.model");

const adminDashboardController = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);


    // Monthly sales
    const startOfMonth = new Date();
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);

    const startOfNextMonth = new Date(startOfMonth);
    startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

    const [
      totalUsers,
      totalOrders,
      recentOrders,
      lowStockSarees,
      outOfStockSarees,
      dailyOrder,
      monthlyOrder,
    ] = await Promise.all([
      userModel.countDocuments(),
      orderModel.countDocuments(),
      orderModel.find().sort({ createdAt: -1 }).limit(5),
      sareeModel.find({
        stock: {
          $lte: 100,
          $gt: 0,
        },
      }),
      sareeModel.find({
        stock: {
          $eq: 0,
        },
      }),
      orderModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfToday,
              $lt: startOfTomorrow,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
      orderModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);
    const orderDaily = dailyOrder[0]?.totalSales || 0;
    const orderMonthly = monthlyOrder[0]?.totalSales || 0;

    res.status(200).json({
      message: "fetched successfully",
      totalUsers,
      totalOrders,
      recentOrders,
      lowStockSarees,
      outOfStockSarees,
      orderDaily,
      orderMonthly,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in adminDashboardController " });
  }
};
module.exports = { adminDashboardController };
