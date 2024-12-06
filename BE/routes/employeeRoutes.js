const express = require('express');
const { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/CategoryController');
const { authenticateJWT } = require('../config/auth');

const router = express.Router();

// Định nghĩa các route cho danh mục
router.post('/', authenticateJWT, createCategory); // Tạo danh mục mới
router.get('/', getAllCategories); // Lấy danh sách danh mục
router.put('/:id', authenticateJWT, updateCategory); // Cập nhật danh mục
router.delete('/:id', authenticateJWT, deleteCategory); // Xóa danh mục

module.exports = router;
