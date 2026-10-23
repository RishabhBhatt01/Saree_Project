const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const sareeModel = require("../models/saree.model");

// Old sarees have no isActive field, so match "not false"
const visible = { isActive: { $ne: false } };

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SORTS = {
  new: { createdAt: -1, _id: -1 },
  "price-asc": { price: 1, _id: 1 },
  "price-desc": { price: -1, _id: -1 },
};

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
    res.status(201).json({ message: "Saree stored Successfully", saree });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in controller" });
  }
};

const PAGE_SIZE = 12;

const getSarees = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const filter = { ...visible };
    if (req.query.fabric) filter.fabric = String(req.query.fabric);
    if (req.query.category) filter.category = String(req.query.category);

    // Search by name, fabric or category (case-insensitive)
    const q = String(req.query.q || "").trim().slice(0, 60);
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ name: rx }, { fabric: rx }, { category: rx }];
    }

    const sort = SORTS[req.query.sort] || SORTS.new;

    const [saree, totalSarees, fabrics, categoryRows] = await Promise.all([
      sareeModel
        .find(filter)
        .sort(sort)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE),
      sareeModel.countDocuments(filter),
      sareeModel.distinct("fabric", visible),
      // One sample image per category (newest saree), for the occasion circles
      sareeModel.aggregate([
        { $match: { ...visible, category: { $nin: [null, ""] } } },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$category",
            image: { $first: "$sareeImg" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1, _id: 1 } },
        { $limit: 8 },
      ]),
    ]);

    const categories = categoryRows.map((c) => ({
      name: c._id,
      image: c.image,
      count: c.count,
    }));

    const totalPages = Math.ceil(totalSarees / PAGE_SIZE);

    res.status(200).json({
      saree,
      fabrics,
      categories,
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
    const saree = await sareeModel.findOne({ _id: req.params.id, ...visible });
    if (!saree) return res.status(404).json({ error: "Saree not found" });
    res.status(200).json({ saree });
  } catch (error) {
    res.status(400).json({ error: "error in saree controller" });
  }
};

const updateSaree = async (req, res) => {
  try {
    const { name, price, fabric, category, description, stock } = req.body;
    const update = {};

    if (name !== undefined) update.name = name;
    if (fabric !== undefined) update.fabric = fabric;
    if (category !== undefined) update.category = category;
    if (description !== undefined) update.description = description;

    if (price !== undefined) {
      const p = Number(price);
      if (!Number.isFinite(p) || p < 0)
        return res.status(400).json({ error: "Invalid price" });
      update.price = p;
    }
    if (stock !== undefined) {
      const s = Number(stock);
      if (!Number.isInteger(s) || s < 0)
        return res.status(400).json({ error: "Invalid stock" });
      update.stock = s;
    }

    // Image is optional: only replace it if a new file was sent
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "saree",
      });
      update.sareeImg = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    const saree = await sareeModel.findOneAndUpdate(
      { _id: req.params.id, ...visible },
      update,
      { new: true }
    );
    if (!saree) return res.status(404).json({ error: "Saree not found" });

    res.status(200).json({ message: "Saree updated", saree });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in updateSaree" });
  }
};

// Soft delete: hidden from the shop, but old orders still show it
const deleteSaree = async (req, res) => {
  try {
    const saree = await sareeModel.findOneAndUpdate(
      { _id: req.params.id, ...visible },
      { isActive: false },
      { new: true }
    );
    if (!saree) return res.status(404).json({ error: "Saree not found" });
    res.status(200).json({ message: "Saree deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleteSaree" });
  }
};

module.exports = {
  sareeController,
  getSarees,
  getOneSaree,
  updateSaree,
  deleteSaree,
};