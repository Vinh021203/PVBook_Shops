const Product = require('../models/Product');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

exports.upload = upload.single('image');

exports.createProduct = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        // Kiểm tra danh mục
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) {
            console.error("Category not found");
            return res.status(404).json({ message: "Category not found" });
        }

        // Tạo sản phẩm mới
        const newProduct = await Product.create({
            productCode: req.body.productCode,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.file?.path || null,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update and Delete remain unchanged


// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category'); // Lấy danh sách sản phẩm cùng thông tin danh mục
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct); // Trả về sản phẩm đã cập nhật
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
