const userModel = require("../models/user.model");

const adminController = async (req, res) => {
  try {
    const admin = await userModel
      .findById(req.userId)
      .select("-password -verificationToken -verificationTokenExpiry");

    res.status(200).json({ message: "welcome admin", admin });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "error occured in admin controller" });
  }
};

module.exports = adminController;