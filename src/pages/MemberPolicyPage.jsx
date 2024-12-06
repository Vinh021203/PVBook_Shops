import React from "react";
import { FaUserPlus, FaCrown, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const MemberPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800">Chính Sách Thành Viên</h1>
          <p className="text-lg text-gray-700">
            Tham gia chương trình thành viên độc quyền và tận hưởng các đặc quyền cao cấp tại Nhà hàng Dola
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Member Card Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaUserPlus className="text-3xl text-amber-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Điều Kiện Thẻ Thành Viên</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Điều kiện để cấp thẻ thành viên:
              </p>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-amber-600 mt-1" />
                <p className="text-gray-600">
                  Khi khách hàng có phát sinh hóa đơn tại Nhà hàng Dola sẽ được cấp thẻ thành viên.
                </p>
              </div>
            </div>
          </div>

          {/* VIP Card Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaCrown className="text-3xl text-amber-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Điều Kiện Thẻ VIP</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">Điều kiện để nhận thẻ VIP:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-amber-600 mt-1" />
                  <span className="text-gray-600">Tổng giá trị mua hàng vượt quá 15 triệu VNĐ/tháng</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-amber-600 mt-1" />
                  <span className="text-gray-600">Mua hàng với giá trị trên 3 triệu VNĐ</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-amber-600 mt-1" />
                  <span className="text-gray-600">Tham gia các chương trình khuyến mãi và hoạt động của Dola</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notes Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaInfoCircle className="text-3xl text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Lưu Ý Quan Trọng</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-gray-700">
                Tổng hạn mức 10, 20, 30, 50 và 100 triệu VNĐ sẽ được tính từ thời điểm mua hàng đầu tiên cho đến khi cấp thẻ.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-gray-700">
                Khi nâng cấp lên VIP và tích lũy đến 20-100 triệu VNĐ, tổng số tiền sẽ được xem xét từ lần mua đầu tiên và tích lũy.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Không Gian Nhà Hàng"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1514933651103-005eec06c04b";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <p className="text-white text-xl md:text-2xl font-semibold">Tham Gia Thành Viên Cao Cấp Ngay Hôm Nay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPolicyPage;