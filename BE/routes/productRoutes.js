const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/ProductController');
const { upload } = require('../middlewares/uploadMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Sử dụng upload từ đúng nguồn
router.post('/', upload, createProduct);
router.get('/', logMiddleware, getAllProducts);
router.put('/:id', upload, logMiddleware, updateProduct);
router.delete('/:id', logMiddleware, deleteProduct);

module.exports = router;
