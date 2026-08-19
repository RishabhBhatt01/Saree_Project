const express = require("express")
const userController = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/get-user",authMiddleware,userController)
module.exports=router