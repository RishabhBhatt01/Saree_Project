const getAdminOrderController = require("../controller/getAdminOrder.controller");
const userAuth = require("../middleware/auth.middleware")
const adminAuth = require("../middleware/admin.middleware")

const express = require("express");

const router = express.Router();
router.get("/get-admin-orders",userAuth,adminAuth,getAdminOrderController);
module.exports = router;
