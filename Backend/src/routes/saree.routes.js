const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {sareeController,getSarees, getOneSaree} = require("../controller/saree.controller");

const router = express.Router();
router.post(
  "/create-sarees",
  authMiddleware,
  adminMiddleware,
  upload.single("sareeImg"),
  sareeController,
);

router.get(
  "/getsarees",
  getSarees
)


router.get(
  "/getOneSaree/:id",
  getOneSaree
)

module.exports = router;
