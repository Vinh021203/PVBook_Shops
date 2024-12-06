import React from "react";

function ProductCard() {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <img src="https://via.placeholder.com/150" alt="product" className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-bold">Product Name</h2>
      <p className="text-sm text-gray-500">Category</p>
      <p className="text-xl font-bold text-green-500">$19.99</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete</button>
    </div>
  );
}

export default ProductCard;
