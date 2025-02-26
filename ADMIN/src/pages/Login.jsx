import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Card, Form, Button, Modal } from "react-bootstrap";
import { MdMailOutline, MdLockOutline } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Trạng thái hiển thị modal
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra tài khoản hợp lệ
    if (username === "admin" && password === "123456") {
      // Lưu trạng thái đăng nhập
      localStorage.setItem("isAuthenticated", "true");
      setShowSuccessModal(true); // Hiển thị modal thông báo
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Đóng modal
    navigate("/"); // Chuyển hướng sang trang Dashboard
  };

  return (
    <Container fluid className="min-vh-100 d-flex">
      {/* Left Section */}
      <Col
        md={6}
        className="bg-primary text-white d-flex flex-column justify-content-center p-5 rounded-left"
        style={{
          background: "linear-gradient(135deg, #3f51b5, #5c6bc0, #7986cb)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h1
          className="display-4 font-weight-bold mb-4 text-center"
          style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
        >
          Chào Mừng Trở Lại
        </h1>
        <p
          className="lead mb-4 text-center"
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.5",
            color: "#f1f1f1",
          }}
        >
          Khám phá hệ thống quản lý tối ưu và mạnh mẽ. Hãy đăng nhập để bắt đầu hành trình của bạn!
        </p>
      </Col>

      {/* Right Section */}
      <Col md={6} className="p-5 d-flex justify-content-center align-items-center">
        <Card
          className="shadow-lg w-100"
          style={{
            maxWidth: "500px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Card.Body>
            <h2
              className="text-center mb-4 font-weight-bold text-primary"
              style={{ fontSize: "2rem", letterSpacing: "1px" }}
            >
              Đăng Nhập
            </h2>
            {error && (
              <div
                className="alert alert-danger"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {error}
              </div>
            )}
            <Form onSubmit={handleLogin} className="space-y-6">
              <Form.Group controlId="username" className="mb-3">
                <Form.Label
                  style={{ fontWeight: "600", fontSize: "0.9rem", color: "#333" }}
                >
                  Tên đăng nhập
                </Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdMailOutline className="me-2 text-muted" size={20} />
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-0 shadow-sm"
                    style={{ fontSize: "0.95rem" }}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label
                  style={{ fontWeight: "600", fontSize: "0.9rem", color: "#333" }}
                >
                  Mật khẩu
                </Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdLockOutline className="me-2 text-muted" size={20} />
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 shadow-sm"
                    style={{ fontSize: "0.95rem" }}
                  />
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 rounded-pill shadow-sm"
                style={{
                  background: "linear-gradient(90deg, #1e88e5, #1976d2)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "linear-gradient(90deg, #1976d2, #1e88e5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "linear-gradient(90deg, #1e88e5, #1976d2)")
                }
              >
                Đăng Nhập
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal thông báo đăng nhập thành công */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Báo</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.1rem",
          }}
        >
          Đăng nhập thành công! Chào mừng bạn đến với hệ thống quản lý thông minh.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseSuccessModal}
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              background: "#1976d2",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
