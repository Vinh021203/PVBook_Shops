import React, { useState } from "react";
import { FaSort, FaFilter } from "react-icons/fa";

const DiscountedProducts = () => {
  const [sortType, setSortType] = useState("default");

  const initialProducts = [
    {
      id: 1,
      name: "The Art of Programming",
      author: "Donald Knuth",
      originalPrice: 59.99 * 24000, // Converted to VND
      discountedPrice: 39.99 * 24000, // Converted to VND
      discount: 33,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      dateAdded: "2024-01-15",
    },
    {
      id: 2,
      name: "Business Strategy Guide",
      author: "Michael Porter",
      originalPrice: 49.99 * 24000,
      discountedPrice: 37.99 * 24000,
      discount: 25,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
      dateAdded: "2024-01-20",
    },
    {
      id: 3,
      name: "Creative Writing Manual",
      author: "Natalie Goldberg",
      originalPrice: 39.99 * 24000,
      discountedPrice: 26.99 * 24000,
      discount: 33,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      dateAdded: "2024-01-10",
    },
    {
      id: 4,
      name: "Modern Philosophy",
      author: "Immanuel Kant",
      originalPrice: 45.99 * 24000,
      discountedPrice: 34.99 * 24000,
      discount: 25,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      dateAdded: "2024-01-25",
    },
    {
      id: 5,
      name: "World History Encyclopedia",
      author: "Peter Stearns",
      originalPrice: 79.99 * 24000,
      discountedPrice: 55.99 * 24000,
      discount: 31,
      image: "https://images.unsplash.com/photo-1553729784-e91953dec042",
      dateAdded: "2024-01-18",
    },
    {
      id: 6,
      name: "Science Fiction Collection",
      author: "Isaac Asimov",
      originalPrice: 55.99 * 24000,
      discountedPrice: 41.99 * 24000,
      discount: 25,
      image: "https://images.unsplash.com/photo-1509266272358-7701da638078",
      dateAdded: "2024-01-22",
    },
    {
      id: 7,
      name: "Cooking Masterclass",
      author: "Gordon Ramsay",
      originalPrice: 49.99 * 24000,
      discountedPrice: 35.99 * 24000,
      discount: 29,
      image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0",
      dateAdded: "2024-01-12",
    },
    {
      id: 8,
      name: "Digital Marketing Guide",
      author: "Seth Godin",
      originalPrice: 69.99 * 24000,
      discountedPrice: 48.99 * 24000,
      discount: 30,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      dateAdded: "2024-01-28",
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const sortProducts = (type) => {
    setSortType(type);
    let sortedProducts = [...products];

    switch (type) {
      case "nameAsc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case "priceLow":
        sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "priceHigh":
        sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      default:
        sortedProducts = initialProducts;
    }

    setProducts(sortedProducts);
  };

  const SortButton = ({ type, label }) => (
    <button
      onClick={() => sortProducts(type)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        sortType === type
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
      aria-label={`Sort by ${label}`}
    >
      <span className="flex items-center gap-2">
        {label} <FaSort />
      </span>
    </button>
  );

  const averagePrice = Math.round(
    products.reduce((sum, product) => sum + product.discountedPrice, 0) / products.length
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold">Xếp theo</h2>
          <FaFilter className="text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-4">
          <SortButton type="nameAsc" label="Tên A-Z" />
          <SortButton type="nameDesc" label="Tên Z-A" />
          <SortButton type="newest" label="Hàng mới" />
          <SortButton type="priceLow" label="Giá thấp đến cao" />
          <SortButton type="priceHigh" label="Giá cao xuống thấp" />
        </div>
      </div>
      {/* <div className="mb-8 text-lg font-bold text-gray-700">
        Trung bình giá: {averagePrice.toLocaleString()} VND
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c";
                }}
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">
                -{product.discount}%
              </div>
            </div>
            <div className="p-4">
              <h3
                className="text-sm font-semibold mb-1 text-gray-800 truncate"
                title={product.name}
              >
                {product.name}
              </h3>
              <p className="text-gray-500 text-xs mb-2">{product.author}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()} VND
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {product.discountedPrice.toLocaleString()} VND
                </span>
              </div>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountedProducts;
