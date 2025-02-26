const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel"); // Import bảng User

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("items.productId") // Lấy thông tin sản phẩm
      .populate("userId", "fullName email"); // Lấy fullName và email từ User

    res.status(200).json(carts);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Các hàm còn lại không thay đổi
exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Sản phẩm đã được thêm vào giỏ hàng.", cart });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Tìm và cập nhật số lượng sản phẩm trong giỏ hàng
    const cart = await Cart.findOneAndUpdate(
      { userId, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } }, // Cập nhật số lượng
      { new: true } // Trả về bản ghi mới nhất
    );

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ hàng." });
    }

    res.json({ message: "Cập nhật giỏ hàng thành công.", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật giỏ hàng." });
  }
};

exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng.", cart });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};
