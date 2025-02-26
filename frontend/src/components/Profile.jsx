import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="text-center text-gray-700 text-lg">
          Không có thông tin người dùng.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Thông Tin Người Dùng
        </h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">Họ và Tên:</span>
            <span className="text-gray-800">{user.fullName}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">Số Điện Thoại:</span>
            <span className="text-gray-800">{user.phone || "Chưa cập nhật"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">Địa Chỉ:</span>
            <span className="text-gray-800">{user.address || "Chưa cập nhật"}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => alert("Chức năng chỉnh sửa thông tin đang phát triển!")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
