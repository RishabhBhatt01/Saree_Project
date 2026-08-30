const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route Imports
<<<<<<< HEAD
const authRoutes = require("../src/routes/auth.routes")
const userRoutes = require("../src/routes/user.routes")
const adminRoutes = require("../src/routes/admin.routes")
const sareeRoutes = require("../src/routes/saree.routes")
// const cartRoutes = require("../src/routes/cart.routes")
=======
const authRoutes = require("../src/routes/auth.routes");
const userRoutes = require("../src/routes/user.routes");
const adminRoutes = require("../src/routes/admin.routes");
const sareeRoutes = require("../src/routes/saree.routes");
const cartRoutes = require("../src/routes/cart.routes");
<<<<<<< HEAD
>>>>>>> cfb2357b4a530761144bbaa935bda417b08b7ec6
=======
const orderRoutes = require("../src/routes/order.routes");
const addressRoutes = require("../src/routes/address.routes");
>>>>>>> e56d7e245ac09a4707888a92c9890b2758bc69c5

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
<<<<<<< HEAD
app.use("/api/auth",authRoutes)
app.use("/api/fetch",userRoutes)
app.use("/api/fetch",adminRoutes)
app.use("/api/submit-get",sareeRoutes)
// app.use("/api/getcart",cartRoutes)
=======
app.use("/api/auth", authRoutes);
app.use("/api/fetch", userRoutes);
app.use("/api/fetch", adminRoutes);
app.use("/api/submit-get", sareeRoutes);
app.use("/api/cart", cartRoutes);
<<<<<<< HEAD
>>>>>>> cfb2357b4a530761144bbaa935bda417b08b7ec6
=======
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
>>>>>>> e56d7e245ac09a4707888a92c9890b2758bc69c5

module.exports = app;
