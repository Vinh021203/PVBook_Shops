const cron = require("node-cron");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const generateOrderCode = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

// Lấy danh sách tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email") // Lấy thông tin user
      .populate("items.productId"); // Lấy thông tin sản phẩm

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Lấy đơn hàng theo User ID
exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Tạo đơn hàng từ giỏ hàng
exports.createOrderFromCart = async (req, res) => {
  const { userId, paymentStatus } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Tính tổng tiền
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const orderStatus = paymentStatus === "success" ? "Completed" : "Pending";

    // Tạo mã đơn hàng duy nhất
    let orderCode;
    let isUnique = false;

    while (!isUnique) {
      orderCode = generateOrderCode();
      const existingOrder = await Order.findOne({ orderCode });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    const newOrder = new Order({
      userId: userId,
      items: cart.items,
      totalAmount,
      status: orderStatus,
      orderCode,
    });

    await newOrder.save();

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Đơn hàng đã được tạo thành công!", order: newOrder });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    if (!["Pending", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ." });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công!",
      order,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    res.status(200).json({ message: "Đơn hàng đã được xóa thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

// Xử lý thanh toán QR
exports.processQrPayment = async (req, res) => {
  const { userId, totalPrice } = req.body;

  try {
    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: totalPrice,
      status: "Completed", // Thanh toán thành công
    });

    await newOrder.save();

    // Xóa giỏ hàng sau khi thanh toán
    await Cart.deleteOne({ userId });

    res.status(200).json({ message: "Thanh toán thành công!", order: newOrder });
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán QR:", error);
    res.status(500).json({ message: "Lỗi server. Vui lòng thử lại.", error });
  }
};

// Cron Job: Tự động chuyển trạng thái Pending thành Completed sau 24h
cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const pendingOrders = await Order.find({ status: "Pending" });

    for (const order of pendingOrders) {
      const orderAge = now - new Date(order.createdAt); // Tính thời gian tồn tại của đơn hàng
      if (orderAge >= 5 * 60 * 1000) { // Nếu hơn 5 phút
        order.status = "Completed";
        await order.save();
      }
    }

    console.log("Cron job: Cập nhật trạng thái đơn hàng hoàn tất.");
  } catch (error) {
    console.error("Cron job lỗi:", error);
  }
});
