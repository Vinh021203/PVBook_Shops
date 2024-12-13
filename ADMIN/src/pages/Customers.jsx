// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "../api/axios";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", address: "", status: "Active" });
//   const [currentCustomer, setCurrentCustomer] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const customersPerPage = 5; // Số khách hàng trên mỗi trang

//   // Fetch danh sách khách hàng từ backend
//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get("/users");
//       setCustomers(response.data);
//     } catch (error) {
//       toast.error("Lỗi khi tải danh sách khách hàng!");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // Lọc khách hàng theo tìm kiếm
//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Phân trang
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
//   const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
//   };

//   const handleShowModal = (customer = null) => {
//     setCurrentCustomer(customer);
//     setFormData(
//       customer
//         ? { ...customer }
//         : { fullName: "", email: "", phone: "", address: "", status: "Active" }
//     );
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({ fullName: "", email: "", phone: "", address: "", status: "Active" });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!formData.fullName || !formData.email || !formData.phone) {
//       toast.error("Vui lòng điền đầy đủ thông tin khách hàng!");
//       return;
//     }

//     try {
//       if (currentCustomer) {
//         // Update customer
//         await axios.put(`/users/${currentCustomer._id}`, formData);
//         toast.success("Thông tin khách hàng đã được cập nhật!");
//       } else {
//         // Add new customer
//         await axios.post("/users", formData);
//         toast.success("Khách hàng mới đã được thêm thành công!");
//       }
//       fetchCustomers();
//       handleCloseModal();
//     } catch (error) {
//       toast.error("Có lỗi xảy ra khi lưu thông tin khách hàng!");
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/users/${id}`);
//       toast.success("Khách hàng đã được xóa thành công!");
//       fetchCustomers();
//     } catch (error) {
//       toast.error("Có lỗi xảy ra khi xóa khách hàng!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Khách Hàng</h2>

//       {/* Thanh tìm kiếm */}
//       <div className="mb-4 d-flex align-items-center">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Tìm kiếm khách hàng theo tên hoặc email..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <FaSearch size={20} />
//       </div>

//       {/* Bảng danh sách khách hàng */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead>
//             <tr>
//               <th style={{ width: "10%" }}>Mã KH</th>
//               <th style={{ width: "15%", wordBreak: "break-word" }}>Tên</th>
//               <th style={{ width: "20%" }}>Email</th>
//               <th style={{ width: "15%" }}>Số điện thoại</th>
//               <th style={{ width: "30%" }}>Địa chỉ</th>
//               <th style={{ width: "10%" }}>Trạng Thái</th>
//               <th>Hành Động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCustomers.map((customer, index) => (
//               <tr key={customer._id}>
//                 <td>{`KH${(indexOfFirstCustomer + index + 1).toString().padStart(3, "0")}`}</td>
//                 <td>{customer.fullName}</td>
//                 <td>{customer.email}</td>
//                 <td>{customer.phone || "N/A"}</td>
//                 <td>{customer.address || "N/A"}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       customer.status === "Active" ? "bg-success" : "bg-danger text-white"
//                     }`}
//                   >
//                     {customer.status === "Active" ? "Đang Hoạt Động" : "Ngừng Hoạt Động"}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => handleShowModal(customer)}
//                   >
//                     <FaEdit /> Sửa
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(customer._id)}
//                   >
//                     <FaTrash /> Xóa
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Phân trang */}
//       <div className="d-flex justify-content-center mt-4">
//         <nav>
//           <ul className="pagination">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <li
//                 key={index + 1}
//                 className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//               >
//                 <button className="page-link" onClick={() => handlePageChange(index + 1)}>
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Nút thêm khách hàng */}
//       <div className="mt-4 text-center">
//         <button className="btn btn-success" onClick={() => handleShowModal()}>
//           <FaPlusCircle /> Thêm Khách Hàng
//         </button>
//       </div>

//       {/* Modal thêm/sửa khách hàng */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{currentCustomer ? "Cập Nhật Khách Hàng" : "Thêm Khách Hàng"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Tên</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="Nhập tên khách hàng"
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Nhập email"
//               />
//             </Form.Group>
//             <Form.Group controlId="formPhone">
//               <Form.Label>Số điện thoại</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Nhập số điện thoại"
//               />
//             </Form.Group>
//             <Form.Group controlId="formAddress">
//               <Form.Label>Địa chỉ</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Nhập địa chỉ"
//               />
//             </Form.Group>
//             <Form.Group controlId="formStatus">
//               <Form.Label>Trạng Thái</Form.Label>
//               <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
//                 <option value="Active">Đang Hoạt Động</option>
//                 <option value="Inactive">Ngừng Hoạt Động</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Đóng
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Lưu
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Customers;

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import axios from "../api/axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null); // Khách hàng hiện tại
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const customersPerPage = 5; // Số khách hàng trên mỗi trang

  // Fetch danh sách khách hàng từ backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/users");
      setCustomers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách hàng!", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Lọc khách hàng theo tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleShowModal = (customer) => {
    setCurrentCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCustomer(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Quản Lý Khách Hàng</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm kiếm khách hàng theo tên hoặc email..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch size={20} />
      </div>

      {/* Bảng danh sách khách hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã KH</th>
              <th style={{ width: "20%" }}>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{`KH${(indexOfFirstCustomer + index + 1).toString().padStart(3, "0")}`}</td>
                <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone || "N/A"}</td>
                <td>{customer.address || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowModal(customer)}
                  >
                    <FaEye /> Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Modal xem thông tin khách hàng */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCustomer ? (
            <div>
              <p>
                <strong>Mã KH:</strong>{" "}
                {`KH${(customers.findIndex((c) => c._id === currentCustomer._id) + 1)
                  .toString()
                  .padStart(3, "0")}`}
              </p>
              <p>
                <strong>Tên:</strong> {currentCustomer.fullName}
              </p>
              <p>
                <strong>Email:</strong> {currentCustomer.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {currentCustomer.phone || "N/A"}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {currentCustomer.address || "N/A"}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {currentCustomer.status === "Active" ? "Đang Hoạt Động" : "Ngừng Hoạt Động"}
              </p>
            </div>
          ) : (
            <p>Không có thông tin khách hàng để hiển thị.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Customers;
