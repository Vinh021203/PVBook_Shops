const Product = require("../models/Product");

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Lỗi trả về nếu yêu cầu không hợp lệ
  }
};


// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  const { searchTerm, page = 1, limit = 5 } = req.query;
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { productCode: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};
  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.status(200).json({ products, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    res.status(200).json({ message: "Sản phẩm đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
