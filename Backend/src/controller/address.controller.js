const addressModel = require("../models/address.model");

const addressController = async (req, res) => {
  try {
    const { fullName, phone, addressLine, city, state, pincode } = req.body;

    const userId = req.userId;

    // create address
    const address = await addressModel.create({
      userId,
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
    });
    res.status(201).json({ message: "address stored successfully", address });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in address controller" });
  }
};

module.exports = addressController;
