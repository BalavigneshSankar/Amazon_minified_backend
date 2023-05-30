const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Cart = mongoose.model("Cart", itemSchema);

module.exports = Cart;
