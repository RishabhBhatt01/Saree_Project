const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  orderController,
  verifyPaymentController,
  cancelPaymentController,
  getOrderController,
  getOneOrderController,
} = require("../controller/order.controller");

const router = express.Router();

router.post("/create-order", authMiddleware, orderController);
router.post("/verify-payment", authMiddleware, verifyPaymentController);
router.post("/cancel-payment", authMiddleware, cancelPaymentController);
router.get("/get-order", authMiddleware, getOrderController);
router.get("/get-one-order/:orderId", authMiddleware, getOneOrderController);

module.exports = router;