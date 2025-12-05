const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Shoe" },
        quantity: Number,
        price: Number
      }
    ],
    totalAmount: { type: Number, required: true },
    subtotal: { type: Number },
    shippingCost: { type: Number, default: 50 },
    status: { type: String, default: "pending" }, // pending, success, cancelled
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    paymentMethod: { type: String, default: "cod" }, // cod, card
    paymentInfo: {
      cardLast4: String,
      cardName: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
