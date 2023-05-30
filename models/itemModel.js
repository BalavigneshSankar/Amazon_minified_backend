const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  availableStock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
