const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String }, // image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
