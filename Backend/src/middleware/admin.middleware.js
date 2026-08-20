const userModel = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Not an admin" });
    }
    next();
  } catch {
    res.status(401).json({ error: "Error in admin Middleware" });
  }
};
module.exports = adminMiddleware;
