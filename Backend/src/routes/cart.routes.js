const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getCartController,
  cartController,
} = require("../controller/cart.controller");
const removeFromCartController = require("../controller/removeFromCartController.controller");
const updateQuantitiesController = require("../controller/updateQuantities.controller")

const router = express.Router();

router.post("/add-to-cart", authMiddleware, cartController);
router.get("/get-cart", authMiddleware, getCartController);
router.delete("/delete-cart/:sareeId", authMiddleware, removeFromCartController);
router.patch("/update-cart-quantity/:sareeId",authMiddleware, updateQuantitiesController);

module.exports = router;
