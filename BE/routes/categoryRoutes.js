const express = require('express');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/CategoryController');
const { authenticateJWT } = require('../config/auth');

const router = express.Router();

router.get('/', getAllCategories); // Không cần token
router.post('/', authenticateJWT, createCategory); // Cần token
router.put('/:id', authenticateJWT, updateCategory); // Cần token
router.delete('/:id', authenticateJWT, deleteCategory); // Cần token

module.exports = router;
