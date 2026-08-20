const express = require("express")
const adminController = require("../controller/admin.controller")
const adminMiddleware = require("../middleware/admin.middleware")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/admin-dashboard",authMiddleware ,adminMiddleware,adminController)
module.exports=router