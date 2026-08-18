const express = require("express") 
const authRoutes = require("../src/routes/auth.routes")

const app = express()
app.use(express.json())
app.use("/api/auth",authRoutes)

module.exports = app
