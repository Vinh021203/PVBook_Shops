const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/ProductController');
const { authenticateJWT } = require('../config/auth'); // Middleware xác thực JWT

const router = express.Router();

// Định nghĩa các route cho sản phẩm
router.post('/', authenticateJWT, createProduct); // Tạo sản phẩm mới
router.get('/', getAllProducts); // Lấy danh sách sản phẩm
router.put('/:id', authenticateJWT, updateProduct); // Cập nhật sản phẩm
router.delete('/:id', authenticateJWT, deleteProduct); // Xóa sản phẩm

module.exports = router;
