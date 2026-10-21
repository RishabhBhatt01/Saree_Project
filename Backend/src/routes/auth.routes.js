const express = require("express");

const {
  registerUser,
  verifyEmail,
  resendVerification,
  loginUser,
  logoutUser,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/register-user", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login-user", loginUser);
router.post("/logout", logoutUser);

module.exports = router;