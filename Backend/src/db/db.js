const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch {
    console.log("Unable to connect to the database");
  }
}
module.exports = connectDB;
