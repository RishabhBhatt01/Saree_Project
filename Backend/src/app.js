const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route Imports
const authRoutes = require("../src/routes/auth.routes");
const userRoutes = require("../src/routes/user.routes");
const adminRoutes = require("../src/routes/admin.routes");
const sareeRoutes = require("../src/routes/saree.routes");
const cartRoutes = require("../src/routes/cart.routes");
const orderRoutes = require("../src/routes/order.routes")

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fetch", userRoutes);
app.use("/api/fetch", adminRoutes);
app.use("/api/submit-get", sareeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes)

module.exports = app;
