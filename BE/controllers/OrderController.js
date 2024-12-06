const Order = require('../models/Order');

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { orderCode, customerName, status, total } = req.body;
        const newOrder = await Order.create({ orderCode, customerName, status, total });
        res.status(201).json(newOrder); // Trả về đơn hàng vừa tạo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders); // Trả về danh sách đơn hàng
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder); // Trả về đơn hàng đã cập nhật
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
