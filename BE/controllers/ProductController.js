const Product = require('../models/Product');
const Category = require('../models/Category');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { productCode, name, image, price, description, category } = req.body;

        // Kiểm tra xem danh mục có tồn tại không
        const categoryExists = await Category.findById(category);
        if (!categoryExists) return res.status(404).json({ message: 'Category not found' });

        const newProduct = await Product.create({ productCode, name, image, price, description, category });
        res.status(201).json(newProduct); // Trả về sản phẩm vừa tạo
    } catch (error) {
        res.status(500).json({ message: error.message }); // Xử lý lỗi
    }
};

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
