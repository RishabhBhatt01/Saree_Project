const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {addressController,getAddressController} = require("../controller/address.controller");

const router = express.Router();

router.post("/submit-address", authMiddleware, addressController);
router.get("/get-address", authMiddleware, getAddressController);


module.exports = router;
