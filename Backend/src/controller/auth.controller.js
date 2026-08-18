const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const token = require("../utils/token")

const registerUser = async (req, res) => {
  try {
    // here I got user details from request
    const { username, email , password } = req.body;

    // Creating unique user in database
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    // create the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    const authToken = token(user.id)
    res.cookie("token",authToken)
    res.status(201).json({ Message: "User created successfully", user });
    
  } catch {
    res.status(400).json({ error: "AuthController : Error Occurred" });
  }
};

const loginUser = async(req,res) =>{
  try{
     const {email,password} = req.body

  const existingUser = await userModel.findOne({email : email})

  if(!existingUser){
    res.status(404).json({message : "User not found in database"})
    return
  }

  // compare
  const isPasswordValid = await bcrypt.compare(password,existingUser.password)
  if(!isPasswordValid){
    res.status(401).json({message : "wrong password"})
    return
  }
  const authToken = token(existingUser.id)
  res.cookie("token",authToken)

  res.status(200).json({mess : "correct password"})
  }catch{
    res.status(400).json({message : "Error occured at Login Controller"})
  }
 
}
module.exports = { registerUser,loginUser};
