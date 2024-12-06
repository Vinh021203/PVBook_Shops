const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryCode: { type: String, required: true, unique: true }, // Mã Danh Mục
    name: { type: String, required: true }, // Tên
    description: { type: String }, // Mô Tả
});

module.exports = mongoose.model('Category', CategorySchema);
