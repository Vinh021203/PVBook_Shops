import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Card, Form, Button } from "react-bootstrap";
import { MdMailOutline, MdLockOutline } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra tài khoản hợp lệ
    if (username === "admin" && password === "123456") {
      // Lưu trạng thái đăng nhập
      localStorage.setItem("isAuthenticated", "true");
      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng sang trang Dashboard
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex">
      <Col md={6} className="bg-primary text-white d-flex flex-column justify-content-center p-5 rounded-left">
        <h1 className="display-4 font-weight-bold mb-4">Chào mừng bạn</h1>
        <p className="lead mb-4">Đăng nhập để quản lý hệ thống.</p>
      </Col>

      <Col md={6} className="p-5 d-flex justify-content-center align-items-center">
        <Card className="shadow-lg w-100" style={{ maxWidth: "500px" }}>
          <Card.Body>
            <h2 className="text-center mb-4 font-weight-bold text-primary">Đăng nhập</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdMailOutline className="me-2 text-muted" size={20} />
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-0 shadow-sm"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label>Mật khẩu</Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdLockOutline className="me-2 text-muted" size={20} />
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 shadow-sm"
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2 rounded-pill shadow-sm">
                Đăng nhập
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
