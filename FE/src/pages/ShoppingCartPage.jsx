import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Nghệ Thuật Lập Trình",
      author: "Robert C. Martin",
      price: 29.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
    },
    {
      id: 2,
      title: "Mẫu Thiết Kế",
      author: "Erich Gamma",
      price: 34.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646"
    },
    {
      id: 3,
      title: "Mã Sạch",
      author: "Robert C. Martin",
      price: 39.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19"
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change)
            }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const BookItem = ({ item }) => (
    <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-32 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e";
          }}
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">{item.author}</p>
          <p className="text-indigo-600 font-semibold">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <FaMinus />
          </button>
          <span className="font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <FaPlus />
          </button>
        </div>
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeItem(item.id)}
          className="p-2 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Giỏ Hàng</h1>
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-gray-600" />
            <span className="text-gray-600">{getTotalItems()} sản phẩm</span>
          </div>
        </div>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <BookItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Tổng phụ</span>
              <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-semibold">Miễn phí</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Tổng cộng</span>
                <span className="text-lg font-semibold">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                <Link to="/payment" className="block w-full h-full text-center">
                  Tiến hành thanh toán
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;