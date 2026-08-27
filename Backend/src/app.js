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
>>>>>>> cfb2357b4a530761144bbaa935bda417b08b7ec6

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
>>>>>>> cfb2357b4a530761144bbaa935bda417b08b7ec6

module.exports = app;
