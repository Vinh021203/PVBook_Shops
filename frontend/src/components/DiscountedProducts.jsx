import React, { useState, useEffect, useCallback } from "react";
import { FaFilter, FaSadTear } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const DiscountedProducts = ({
  searchQuery,
  selectedCategory,
  selectedAuthor,
  filters,
  selectedPriceRange,
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  // Fetch sản phẩm từ API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setIsNotFound(false);

    try {
      let response;

      if (selectedCategory) {
        response = await axios.get("/products/category", {
          params: { category: selectedCategory },
        });
      } else if (selectedAuthor?.length) {
        response = await axios.get("/products", {
          params: { authors: selectedAuthor.join(",") },
        });
      } else {
        response = await axios.get("/products");
      }

      const backendProducts = response.data.map((product) => ({
        id: product._id,
        name: product.name,
        author: product.author,
        rating: product.rating || Math.floor(Math.random() * 5) + 1,
        reviews: product.reviews || Math.floor(Math.random() * 100) + 1,
        originalPrice: Math.ceil(product.price * 1.2),
        discountedPrice: Math.ceil(product.price * 0.8),
        discount: product.discount || 20,
        image: product.image,
        dateAdded: product.createdAt,
      }));

      setProducts(backendProducts);
      setFilteredProducts(backendProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setIsNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedAuthor]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, filters]);

  useEffect(() => {
    let filtered = products;

    if (selectedPriceRange) {
      const { min, max } = selectedPriceRange;
      filtered = filtered.filter(
        (product) => product.discountedPrice >= min && product.discountedPrice <= max
      );
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.author.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredProducts(filtered);
    setIsNotFound(filtered.length === 0);
  }, [searchQuery, selectedPriceRange, products]);

  const sortProducts = (type) => {
    setSortType(type);
    let sortedProducts = [...filteredProducts];

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
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isNotFound) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-96 text-red-600">
        <FaSadTear className="text-6xl mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold">Xếp theo</h2>
          <FaFilter className="text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => sortProducts("nameAsc")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              sortType === "nameAsc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Tên A-Z
          </button>
          <button
            onClick={() => sortProducts("nameDesc")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              sortType === "nameDesc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Tên Z-A
          </button>
          <button
            onClick={() => sortProducts("newest")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              sortType === "newest"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Hàng mới
          </button>
          <button
            onClick={() => sortProducts("priceLow")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              sortType === "priceLow"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Giá thấp đến cao
          </button>
          <button
            onClick={() => sortProducts("priceHigh")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              sortType === "priceHigh"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Giá cao xuống thấp
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Component hiển thị sản phẩm
const ProductCard = ({ product, navigate }) => {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/150";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full object-cover h-[300px]"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-md font-bold text-sm">
            Giảm {product.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        {/* Tác giả với giới hạn chiều dài và thêm dấu "..." */}
        <p className="text-sm text-gray-600 truncate" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Tác giả: {product.author}
        </p>
        <p className="text-sm text-gray-600">
          Xếp hạng: {product.rating} ⭐ ({product.reviews} đánh giá)
        </p>
        <div className="mb-4">
          <span className="text-lg font-bold text-red-600">
            {product.discountedPrice?.toLocaleString()} đ
          </span>
          <span className="ml-2 text-sm text-gray-400 line-through">
            {product.originalPrice?.toLocaleString()} đ
          </span>
        </div>
        <button
          onClick={() => navigate(`/product/book-detail/${product.id}`)}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default DiscountedProducts;
