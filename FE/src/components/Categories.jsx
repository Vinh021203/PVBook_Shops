import React from "react";

const Categories = () => {
  const categories = [
    "Văn học",
    "Khoa học",
    "Trẻ em",
    "Lịch sử",
    "Tiểu sử",
    "Thơ",
    "Công nghệ",
  ];

  return (
    <div className="bg-gray-50 p-6 shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
