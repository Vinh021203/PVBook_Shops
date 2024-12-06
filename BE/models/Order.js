const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderCode: { type: String, required: true, unique: true }, // Mã Đơn Hàng
    customerName: { type: String, required: true }, // Tên Khách Hàng
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }, // Trạng Thái
    date: { type: Date, default: Date.now }, // Ngày
    total: { type: Number, required: true }, // Tổng
});

module.exports = mongoose.model('Order', OrderSchema);
