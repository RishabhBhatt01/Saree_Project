const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  items: [
    {
      sareeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "saree",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Order = new mongoose.model("order", orderSchema);
module.exports = Order;
