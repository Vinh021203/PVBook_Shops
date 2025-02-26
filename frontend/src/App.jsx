import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import FooterHighlights from "./components/FooterHighlights";
import Profile from "./components/Profile";
import MemberPolicyPage from "./pages/MemberPolicyPage";
import ContactPage from "./pages/ContactPage";
import IntroductionPage from "./pages/IntroductionPage";
import AuthForm from "./components/AuthForm";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import PaymentPage from "./pages/PaymentPage";
import BookDetailPage from "./pages/BookDetailPage";
import ProductPage from "./pages/ProductPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const App = () => {
  // State quản lý tìm kiếm và trạng thái khác
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      localStorage.removeItem("userId");
      console.log("Người dùng chưa đăng nhập. Đã xóa User ID.");
    }
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <Router>
      <div>
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Navbar */}
        <div className="mt-[110px] w-full">
          <Navbar />
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage searchQuery={searchQuery} />} />
          <Route path="/product/book-detail/:id" element={<BookDetailPage />} />
          <Route path="/products/:category" element={<ProductPage searchQuery={searchQuery} />} />
          <Route path="/memberpolicy" element={<MemberPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderstatus" element={<OrderStatusPage />} />
          <Route path="/authform" element={<AuthForm />} />
          <Route path="/shoppingcart" element={<ShoppingCartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>

        {/* Footer */}
        <FooterHighlights />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
