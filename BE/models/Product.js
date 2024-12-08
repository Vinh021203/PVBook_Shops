const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
