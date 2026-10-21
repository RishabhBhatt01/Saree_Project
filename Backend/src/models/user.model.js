const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // Email verification status
    isVerified: {
      type: Boolean,
      default: false
    },

    // Hashed verification token
    verificationToken: {
      type: String,
      default: null
    },

    // Token expiration time
    verificationTokenExpiry: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;