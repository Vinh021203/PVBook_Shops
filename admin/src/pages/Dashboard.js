function Dashboard({ stats = {} }) {
    const {
      totalProducts = 0,
      totalOrders = 0,
      totalEmployees = 0,
      monthlyRevenue = 0,
      pendingOrders = 0,
      totalCustomers = 0,  // Thêm totalCustomers
    } = stats;
  
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6">Dashboard Tổng Quan</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h3 className="card-title text-primary">Tổng Số Sản Phẩm</h3>
                <p className="display-4 fw-bold">{totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h3 className="card-title text-success">Tổng Số Đơn Hàng</h3>
                <p className="display-4 fw-bold">{totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h3 className="card-title text-warning">Tổng Số Nhân Viên</h3>
                <p className="display-4 fw-bold">{totalEmployees}</p>
              </div>
            </div>
          </div>
          {/* Thêm card cho tổng số khách hàng */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h3 className="card-title text-info">Tổng Số Khách Hàng</h3>
                <p className="display-4 fw-bold">{totalCustomers}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-5">
          <h3 className="text-2xl font-bold mb-4">Chi Tiết Thống Kê</h3>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="card-title">Doanh Thu Tháng Này</h4>
                  <p className="text-success fw-bold">₫{monthlyRevenue}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="card-title">Đơn Hàng Chờ Xử Lý</h4>
                  <p className="text-danger fw-bold">{pendingOrders} đơn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  