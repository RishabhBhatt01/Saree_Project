const mongoose = require("mongoose");

const sareeSchema = new mongoose.Schema({
  name: String,
  sareeImg: String,
  price: Number,
  fabric: String,
  category: String,
  description: String,
});

const Saree = mongoose.model("saree", sareeSchema);
module.exports = Saree;
