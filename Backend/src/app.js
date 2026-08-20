const express = require("express")
const cookieParser = require("cookie-parser")

// Route Imports
const authRoutes = require("../src/routes/auth.routes")
const userRoutes = require("../src/routes/user.routes")
const adminRoutes = require("../src/routes/admin.routes")


const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/fetch",userRoutes)
app.use("/api/fetch",adminRoutes)



module.exports = app
