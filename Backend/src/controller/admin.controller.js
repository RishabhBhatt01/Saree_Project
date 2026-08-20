const userModel = require("../models/user.model");
const adminController = async (req, res) => {
  try {
    const adminId = req.userId;
    const admin = await userModel.findOne({ _id: adminId });

    res.status(200).json({ message: "welcome admin", admin });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "error occured in admin controller" });
  }
};
module.exports=adminController
