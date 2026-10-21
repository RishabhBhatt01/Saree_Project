const cloudinary = require("../config/cloudinary");
const sareeModel = require("../models/saree.model");

const sareeController = async (req, res) => {
  try {
    const { name, price, fabric, category, description, stock } = req.body;
    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "saree",
    });

    const saree = await sareeModel.create({
      name,
      price,
      fabric,
      category,
      description,
      stock,
      sareeImg: result.secure_url,
    });
    res.status(201).json({
      message: "Saree stored Successfully",
      saree,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "error in controller" });
  }
};

const PAGE_SIZE = 12;

const getSarees = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const filter = {};
    if (req.query.fabric) filter.fabric = req.query.fabric;

    const [saree, totalSarees, fabrics] = await Promise.all([
      sareeModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE),
      sareeModel.countDocuments(filter),
      sareeModel.distinct("fabric"),
    ]);

    const totalPages = Math.ceil(totalSarees / PAGE_SIZE);

    res.status(200).json({
      saree,
      fabrics,
      currentPage: page,
      totalSarees,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in saree controller" });
  }
};

const getOneSaree = async (req, res) => {
  try {
    const saree = await sareeModel.findOne({ _id: req.params.id });
    res.status(200).json({ saree: saree });
  } catch (error) {
    res.status(400).json({ error: "error in saree controller", error });
  }
};
module.exports = {
  sareeController,
  getSarees,
  getOneSaree,
};