const cloudinary = require("../config/cloudinary");
const sareeModel = require("../models/saree.model")


const sareeController = async (req, res) => {
  try {
    const { name, price, fabric, category, description } = req.body;
    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "saree",
    });

    const saree = await sareeModel.create({
      name,price,fabric,category,description,sareeImg:result.secure_url
    })
    res.status(201).json({
      message: "Saree stored Successfully",
      saree
    });
    console.log(result);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "error in controller" });
  }
};
module.exports = sareeController;
