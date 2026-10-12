const userModel = require("../models/user.model");
const userController = async (req, res) => {
  try {
    const id = req.userId;
    const user = await userModel.findOne({ _id: id });
    res.status(200).json({ message: "success", user });
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};
module.exports = userController;