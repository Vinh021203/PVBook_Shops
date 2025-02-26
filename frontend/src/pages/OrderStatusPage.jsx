import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

const OrderStatusPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [cancelingOrder, setCancelingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem trạng thái đơn hàng.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`/orders/${userId}`);
        setOrders(data);
      } catch (err) {
        setError("Không thể tải trạng thái đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put("/orders", { orderId, status: "Cancelled" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      setNotification({ message: "Đơn hàng đã được hủy thành công!", type: "success" });
      setCancelingOrder(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ message: "Không thể hủy đơn hàng. Vui lòng thử lại.", type: "error" });
      setCancelingOrder(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const confirmCancelOrder = (orderId) => {
    setCancelingOrder(orderId);
    setTimeout(() => {
      handleCancelOrder(orderId);
    }, 3000); // Hủy sau 3 giây
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Trạng Thái Đơn Hàng</h2>

        {/* Hiển thị thông báo */}
        {notification && (
          <div
            className={`fixed top-16 right-4 z-50 p-4 rounded-md shadow-lg text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4 relative">
              <h3 className="font-semibold text-lg">Mã Đơn Hàng: {order.orderCode}</h3>
              <p>
                <strong>Ngày Tạo:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Tổng Tiền:</strong> {order.totalAmount.toLocaleString()}đ
              </p>
              <p className="flex items-center gap-2">
                <strong>Trạng Thái:</strong>{" "}
                {order.status === "Completed" && (
                  <span className="text-green-600 flex items-center gap-1">
                    <FaCheckCircle /> Hoàn Thành
                  </span>
                )}
                {order.status === "Pending" && (
                  <span className="text-yellow-600 flex items-center gap-1">
                    <FaHourglassHalf /> Đang Xử Lý
                  </span>
                )}
                {order.status === "Cancelled" && (
                  <span className="text-red-600 flex items-center gap-1">
                    <FaTimesCircle /> Đã Hủy
                  </span>
                )}
              </p>

              {/* Nút hủy đơn hàng */}
              <div className="mt-4 flex justify-between items-center">
                {order.status === "Pending" && cancelingOrder === order._id ? (
                  <div className="text-yellow-500 text-sm flex items-center gap-2">
                    <span>Đang hủy đơn...</span>
                    <div className="w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  order.status === "Pending" && (
                    <button
                      onClick={() => confirmCancelOrder(order._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      Hủy Đơn Hàng
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
