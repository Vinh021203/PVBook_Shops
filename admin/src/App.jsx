import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import Employees from "./components/Employees";
import Cart from "./components/Cart";
import Customers from "./components/Customers";
import Reports from "./components/Reports";
import Login from "./pages/Login";
import { ReportProvider } from "./components/ReportContext";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ReportProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="d-flex">
                  <div className="col-3 bg-dark text-white p-4" style={{ position: "fixed", height: "100vh" }}>
                    <Sidebar />
                  </div>
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
    </ReportProvider>
  );
}

export default App;
