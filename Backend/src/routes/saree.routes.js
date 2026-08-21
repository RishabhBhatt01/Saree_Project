const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const sareeController = require("../controller/saree.controller");

const router = express.Router();
router.post(
  "/sarees",
  authMiddleware,
  adminMiddleware,
  upload.single("sareeImg"),
  sareeController,
);
module.exports = router;
