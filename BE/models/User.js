const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customerCode: { type: String, required: true, unique: true }, // Mã Khách Hàng
    name: { type: String, required: true }, // Tên
    email: { type: String, required: true, unique: true }, // Email
    phone: { type: String }, // Số Điện Thoại
    address: { type: String }, // Địa Chỉ
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // Trạng Thái
});

module.exports = mongoose.model('Customer', CustomerSchema);
