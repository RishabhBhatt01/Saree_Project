const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  registerUser,
  verifyEmail,
  resendVerification,
  loginUser,
  logoutUser,
} = require("../controller/auth.controller");

const router = express.Router();

const makeLimiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

const loginLimiter = makeLimiter(
  15,
  10,
  "Too many login attempts. Please try again in 15 minutes."
);
const registerLimiter = makeLimiter(
  60,
  10,
  "Too many sign-up attempts. Please try again later."
);
const resendLimiter = makeLimiter(
  60,
  5,
  "Too many email requests. Please try again later."
);

router.post("/register-user", registerLimiter, registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerification);
router.post("/login-user", loginLimiter, loginUser);
router.post("/logout", logoutUser);

module.exports = router;