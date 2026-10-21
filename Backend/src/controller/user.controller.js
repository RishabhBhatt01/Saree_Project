const userModel = require("../models/user.model");

const userController = async (req, res) => {
  try {
    // Never send the password hash or verification token to the client
    const user = await userModel
      .findById(req.userId)
      .select("-password -verificationToken -verificationTokenExpiry");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "success", user });
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};
module.exports = userController;