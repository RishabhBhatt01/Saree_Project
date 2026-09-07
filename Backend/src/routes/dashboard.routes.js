const express = require("express");
const {adminDashboardController} = require("../controller/adminDashboard.controller");
const adminAuth = require("../middleware/admin.middleware");
const userAuth = require("../middleware/auth.middleware")
const router = express.Router();
router.get("/admin-dashboard-data",userAuth, adminAuth, adminDashboardController);
module.exports = router;