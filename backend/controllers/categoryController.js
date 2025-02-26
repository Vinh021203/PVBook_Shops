const Category = require("../models/categoryModel");
const Product = require("../models/productModel"); // Import model sản phẩm

// Lấy danh sách danh mục với số lượng sản phẩm
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ category: category._id });
        return { ...category.toObject(), productCount }; // Thêm productCount vào mỗi danh mục
      })
    );
    res.status(200).json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải danh mục!", error: error.message });
  }
};

// Thêm danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    // Tự động tạo mã danh mục
    const categoriesCount = await Category.countDocuments();
    const newCategory = new Category({
      id: `C${categoriesCount + 1}`.padStart(4, "0"),
      name,
      description,
      isActive: isActive ?? true,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm danh mục mới!", error: error.message });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      { id },
      { name, description, isActive },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Danh mục không tồn tại!" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật danh mục!", error: error.message });
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra nếu danh mục có sản phẩm thì không cho phép xóa
    const productExists = await Product.exists({ category: id });
    if (productExists) {
      return res.status(400).json({
        message: `Không thể xóa danh mục với ID "${id}" vì còn sản phẩm liên kết!`,
      });
    }

    const deletedCategory = await Category.findOneAndDelete({ id });

    if (!deletedCategory) {
      return res.status(404).json({ message: `Danh mục với ID "${id}" không tồn tại!` });
    }

    res.status(200).json({ message: `Danh mục với ID "${id}" đã được xóa thành công!` });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Lỗi khi xóa danh mục!", error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
