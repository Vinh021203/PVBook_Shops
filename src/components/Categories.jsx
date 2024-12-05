import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 py-3">
      {categories.map((category, index) => (
        <button
          key={index}
          className="text-gray-600 hover:text-blue-600 whitespace-nowrap focus:outline-none"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
