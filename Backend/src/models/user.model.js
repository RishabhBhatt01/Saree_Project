const mongoose = require("mongoose")

// Create USER schema

const userSchema = new mongoose.Schema({
  username : String,
  email : String,
  password : String,
  role : {
    type : String,
    enum : ["user","admin"],
    default : "user"
  }
})

const User = mongoose.model("user", userSchema)

module.exports = User