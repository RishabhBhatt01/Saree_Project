const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {orderController,getOrderController,getOneOrderController} = require("../controller/order.controller");

const router = express.Router();
console.log("here");

router.post("/create-order", authMiddleware, orderController);
router.get("/get-order", authMiddleware, getOrderController);
router.get("/get-one-order/:orderId", authMiddleware, getOneOrderController);


console.log("in routes page");

module.exports = router;
