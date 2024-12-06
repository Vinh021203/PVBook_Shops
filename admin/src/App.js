import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";  // Import mới
import Reports from "./pages/Reports";      // Import mới
import Settings from "./pages/Settings"; 


function App() {
  const stats = {
    totalProducts: 50,
    totalOrders: 120,
    totalEmployees: 10,
    monthlyRevenue: 5000000,
    pendingOrders: 15,
    totalCustomers: 200,
  };

  return (
    <Router>
      <div className="d-flex" style={{ height: "100vh" }}>
        {/* Sidebar chiếm 1/4 màn hình */}
        <div className="col-3 bg-dark text-white p-4">
          <Sidebar />
        </div>

        {/* Nội dung chiếm 3/4 màn hình */}
        <div className="col-9">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard stats={stats} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
