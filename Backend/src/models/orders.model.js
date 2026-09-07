const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      addressLine: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Shipped"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

orderSchema.index({ createdAt: -1 });
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
