const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {
  sareeController,
  getSarees,
  getOneSaree,
  updateSaree,
  deleteSaree,
} = require("../controller/saree.controller");

const router = express.Router();

router.post(
  "/create-sarees",
  authMiddleware,
  adminMiddleware,
  upload.single("sareeImg"),
  sareeController
);

router.put(
  "/update-saree/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("sareeImg"),
  updateSaree
);

router.delete(
  "/delete-saree/:id",
  authMiddleware,
  adminMiddleware,
  deleteSaree
);

router.get("/getsarees", getSarees);
router.get("/getOneSaree/:id", getOneSaree);

module.exports = router;