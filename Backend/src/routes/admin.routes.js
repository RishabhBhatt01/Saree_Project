const express = require("express");
const adminController = require("../controller/admin.controller");
const adminMiddleware = require("../middleware/admin.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const singleOrderDetailsAdmin = require("../controller/singleOrderDetailsAdmin.controller");
const adminUpdateOrderStatus = require("../controller/adminUpdateOrderStatus.controller");
const router = express.Router();

router.get("/admin-details", authMiddleware, adminMiddleware, adminController);

router.get(
  "/single-order-details/:orderId",
  authMiddleware,
  adminMiddleware,
  singleOrderDetailsAdmin,
);

router.post(
  "/update-order-status/:orderId",
  authMiddleware,
  adminMiddleware,
  adminUpdateOrderStatus,
);

module.exports = router;
