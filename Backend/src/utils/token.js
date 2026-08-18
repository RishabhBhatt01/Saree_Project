const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

function token(id) {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}
module.exports = token;
