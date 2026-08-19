require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Invalid User" });
      return;
    }
    // things will work here if token exists
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // req.userId added to the request
    next();
  } catch {
    res.status(400).json({ message: "Error" });
  }
};
module.exports = authMiddleware;
