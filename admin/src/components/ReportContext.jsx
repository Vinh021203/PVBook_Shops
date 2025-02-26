import React, { createContext, useContext, useState } from "react";

// Tạo context
const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEmployees: 0, // Giữ nguyên giá trị mặc định
    monthlyRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });

  return (
    <ReportContext.Provider value={{ reportData, setReportData }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);
