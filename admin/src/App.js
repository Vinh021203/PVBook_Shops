import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Cart from "./pages/Cart";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

// Kiểm tra trạng thái đăng nhập
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Các trang quản trị (được bảo vệ) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                {/* Sidebar */}
                <div className="col-3 bg-dark text-white p-4" style={{ position: "fixed", height: "100vh" }}>
                  <Sidebar />
                </div>

                {/* Nội dung chính */}
                <div className="col-9" style={{ marginLeft: "25%", overflowY: "auto", height: "100vh" }}>
                  <Navbar />
                  <div className="p-4">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
