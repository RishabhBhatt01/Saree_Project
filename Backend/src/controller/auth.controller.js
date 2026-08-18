// Get username, email, and password from req.body.
// Check whether the user already exists.
// Create a new user using your User model.
// Save it to MongoDB.
// Send a response back to Postman.

const userModel = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    // here I got user details from request
    const { username, email, password } = req.body;

    // Creating unique user in database
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    } else {
      // create the user
      const user = await userModel.create({ username, email, password });
      res.status(201).json({ Message: "User created successfully",user });
    }
  } catch {
    res.status(400).json({ error: "AuthController : Error Occurred" });
  }
};
module.exports = { registerUser };
