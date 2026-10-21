const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const token = require("../utils/token");
const sendVerificationEmail = require("../utils/sendEmail");

const VERIFY_TTL_MS = 30 * 60 * 1000; // verification link lifetime
const RESEND_COOLDOWN_MS = 60 * 1000; // min gap between emails
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// Used so a login for an unknown email costs the same time as a real one
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

// Cookie options. clearCookie needs the same options (minus maxAge).
const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

// Sets a fresh hashed token on the user doc and returns the raw token.
// Caller must save the user.
const issueVerificationToken = (user) => {
  const raw = crypto.randomBytes(32).toString("hex");
  user.verificationToken = sha256(raw);
  user.verificationTokenExpiry = new Date(Date.now() + VERIFY_TTL_MS);
  return raw;
};

// Link points to the FRONTEND page, which then calls the verify API.
const buildVerificationLink = (rawToken, email) =>
  `${process.env.CLIENT_URL}/verify-email` +
  `?token=${rawToken}&email=${encodeURIComponent(email)}`;

// POST /api/auth/register-user
const registerUser = async (req, res) => {
  try {
    const username = String(req.body.username || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res
          .status(409)
          .json({ message: "An account with this email already exists" });
      }
      return res.status(409).json({
        message:
          "This email is registered but not verified yet. We can send you a new link.",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const user = new userModel({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const rawToken = issueVerificationToken(user);

    try {
      await user.save();
    } catch (err) {
      // Two simultaneous signups with the same email
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "An account with this email already exists" });
      }
      throw err;
    }

    try {
      await sendVerificationEmail(email, buildVerificationLink(rawToken, email));
    } catch (emailError) {
      console.error("Verification email failed:", emailError.message);
      return res.status(502).json({
        message:
          "Account created, but we couldn't send the verification email. Please use resend.",
        code: "EMAIL_SEND_FAILED",
      });
    }

    // No cookie and no user data: login is only allowed after verification
    return res.status(201).json({
      message: "Registration successful. Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Error occurred during registration" });
  }
};

// GET /api/auth/verify-email?token=...&email=...
const verifyEmail = async (req, res) => {
  try {
    const { token: rawToken, email: rawEmail } = req.query;

    if (typeof rawToken !== "string" || typeof rawEmail !== "string") {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    const user = await userModel.findOne({ email: normalizeEmail(rawEmail) });
    if (!user) {
      return res
        .status(400)
        .json({ message: "This verification link is invalid or has expired" });
    }

    // Already verified (double click, email scanners, React StrictMode)
    if (user.isVerified) {
      return res.status(200).json({
        message: "Email already verified. You can log in.",
        alreadyVerified: true,
      });
    }

    const notExpired =
      user.verificationToken &&
      user.verificationTokenExpiry &&
      user.verificationTokenExpiry > new Date();

    let tokenMatches = false;
    if (notExpired) {
      const a = Buffer.from(sha256(rawToken));
      const b = Buffer.from(user.verificationToken);
      tokenMatches = a.length === b.length && crypto.timingSafeEqual(a, b);
    }

    if (!tokenMatches) {
      return res
        .status(400)
        .json({ message: "This verification link is invalid or has expired" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error("Email verification error:", error.message);
    return res
      .status(500)
      .json({ message: "Error occurred during email verification" });
  }
};

// POST /api/auth/resend-verification  { email }
const resendVerification = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Same reply whether or not the account exists
    const genericReply = {
      message:
        "If that email is registered and not yet verified, a new verification link has been sent.",
    };

    const user = await userModel.findOne({ email });
    if (!user || user.isVerified) {
      return res.status(200).json(genericReply);
    }

    // Cooldown: the last send time is derived from the token expiry
    if (user.verificationTokenExpiry) {
      const issuedAt = user.verificationTokenExpiry.getTime() - VERIFY_TTL_MS;
      const waitMs = RESEND_COOLDOWN_MS - (Date.now() - issuedAt);
      if (waitMs > 0) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(waitMs / 1000)}s before requesting another email.`,
        });
      }
    }

    const rawToken = issueVerificationToken(user);
    await user.save();

    try {
      await sendVerificationEmail(email, buildVerificationLink(rawToken, email));
    } catch (emailError) {
      console.error("Resend email failed:", emailError.message);
      return res
        .status(502)
        .json({ message: "We couldn't send the email. Please try again later." });
    }

    return res.status(200).json(genericReply);
  } catch (error) {
    console.error("Resend error:", error.message);
    return res.status(500).json({ message: "Error occurred while resending email" });
  }
};

// POST /api/auth/login-user
const loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    // Always run bcrypt so timing doesn't reveal whether the email exists
    const passwordOk = await bcrypt.compare(
      password,
      user ? user.password : DUMMY_HASH,
    );

    if (!user || !passwordOk) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Checked after the password, so only the real owner learns this
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    res.cookie("token", token(user.id), { ...COOKIE_BASE, maxAge: COOKIE_MAX_AGE });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Error occurred during login" });
  }
};

// POST /api/auth/logout
const logoutUser = (req, res) => {
  res.clearCookie("token", COOKIE_BASE);
  return res.status(200).json({ message: "Logged out" });
};

module.exports = {
  registerUser,
  verifyEmail,
  resendVerification,
  loginUser,
  logoutUser,
};