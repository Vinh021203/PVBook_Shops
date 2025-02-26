const Product = require("../models/productModel");
const Category = require("../models/categoryModel"); // Import Category
const mongoose = require("mongoose");

// Get all products
const getProducts = async (req, res) => {
  try {
    const { category, authors } = req.query;
    let query = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (authors) {
      query.author = { $in: authors.split(",") }; // Lọc danh sách tác giả
    }

    const products = await Product.find(query).populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductSuggestions = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    // Tìm kiếm sản phẩm theo tên hoặc tác giả
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } },
      ],
    }).select("name author"); // Chỉ lấy tên và tác giả để giảm dữ liệu trả về

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching product suggestions:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await Product.distinct("author"); // Lấy danh sách các tác giả không trùng lặp
    res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Tìm ObjectId của danh mục dựa trên tên
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Lọc sản phẩm theo ObjectId của danh mục
    const products = await Product.find({ category: categoryDoc._id }).populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { productCode, name, price, description, category, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!productCode || !name || !price || !description || !category || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tìm danh mục theo `_id` hoặc `name`
    const categoryDoc = mongoose.Types.ObjectId.isValid(category)
      ? await Category.findById(category) // Tìm bằng `_id`
      : await Category.findOne({ name: category }); // Hoặc tìm bằng `name`

    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({
      productCode,
      name,
      price,
      description,
      category: categoryDoc._id,
      author,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(400).json({ message: "Invalid product data", error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error: error.message });
  }
};

const updateProductStock = async (req, res) => {
  const { stockChange } = req.body;

  if (typeof stockChange !== "number") {
    return res.status(400).json({ message: "Invalid stock change value" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Kiểm tra nếu tồn kho không đủ
    if (product.stock + stockChange < 0) {
      return res.status(400).json({ message: "Sản phẩm không đủ tồn kho" });
    }

    product.stock += stockChange;
    await product.save();
    res.status(200).json({ message: "Stock updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error: error.message });
  }
};


module.exports = {
  getProducts,
  getProductsByCategory, // Export hàm mới
  getProductById,
  getAuthors,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSuggestions,
  updateProductStock,
};