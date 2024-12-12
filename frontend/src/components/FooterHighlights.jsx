import React from "react";
import { FaTruck, FaExchangeAlt, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const FooterHighlights = () => {
  const features = [
    {
      title: "GIAO HÀNG TẬN NƠI",
      description: "Miễn phí giao hàng nội thành.",
      icon: <FaTruck className="text-3xl text-blue-500" />
    },
    {
      title: "ĐỔI TRẢ DỄ DÀNG",
      description: "Miễn phí đổi trả trong 10 ngày.",
      icon: <FaExchangeAlt className="text-3xl text-green-500" />
    },
    {
      title: "Sản phẩm chính hãng",
      description: "Cam kết hàng chính hãng 100%.",
      icon: <FaCheckCircle className="text-3xl text-yellow-500" />
    },
    {
      title: "Nhận hàng trả tiền",
      description: "Ship cod trên toàn quốc.",
      icon: <FaMoneyBillWave className="text-3xl text-red-500" />
    }
  ];

  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterHighlights;