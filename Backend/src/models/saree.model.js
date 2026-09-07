const mongoose = require("mongoose");

const sareeSchema = new mongoose.Schema({
  name: String,
  sareeImg: String,
  price: Number,
  stock : Number,
  fabric: String,
  category: String,
  description: String,
},{timestamps : true});


sareeSchema.index({stock : 1});
const Saree = mongoose.model("saree", sareeSchema);
module.exports = Saree;
