const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const addressController = require("../controller/address.controller");

const router = express.Router();

router.post("/submit-address", authMiddleware.addressController);

module.exports = router;
