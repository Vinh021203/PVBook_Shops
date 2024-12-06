const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct, upload } = require('../controllers/ProductController');
const logMiddleware = require('../middlewares/logMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Thêm middleware log
router.post('/', upload, createProduct);
router.get('/', logMiddleware, getAllProducts);
router.put('/:id', upload, logMiddleware, updateProduct);
router.delete('/:id', logMiddleware, deleteProduct);

module.exports = router;
