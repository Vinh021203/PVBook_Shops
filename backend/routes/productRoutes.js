const express = require("express");
const multer = require("multer");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getAuthors,
  getProductSuggestions,
  updateProductStock,
} = require("../controllers/productController");

const router = express.Router();

// Cấu hình Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Đường dẫn thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Tên file duy nhất
    },
  }),
});

// Routes
router.get("/", getProducts);
router.get("/category", getProductsByCategory);
router.get("/suggestions", getProductSuggestions);
router.get("/authors", getAuthors); // Định nghĩa route mới để lấy danh sách tác giả
router.get("/:id", getProductById); // Định nghĩa route chi tiết sản phẩm
router.post("/", upload.single("image"), createProduct); // Thêm middleware upload
router.put("/:id/stock", updateProductStock);
router.put("/:id", upload.single("image"), updateProduct); // Cho phép cập nhật file
router.delete("/:id", deleteProduct);

module.exports = router;

