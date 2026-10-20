const orderModel = require("../models/orders.model");
const singleOrderDetailsAdmin = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderModel.findById(orderId).populate("userId").populate("items.sareeId");
    if (!order) {
      console.log("no order found");
      res.status(404).json({ error: "no order found" });
      return;
    }
    return res.status(200).json({message : "fetched successfully",order})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error in singleOrderDetailsAdmin" });
  }
};
module.exports=singleOrderDetailsAdmin;
