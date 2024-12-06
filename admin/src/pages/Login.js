import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Card, Form, Button } from 'react-bootstrap'; // Thêm import các component từ react-bootstrap
import { MdMailOutline, MdLockOutline } from 'react-icons/md'; // Thêm icon nếu cần
import { FaPlay } from 'react-icons/fa'; // Thêm icon play

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'admin' && password === '123456') {
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      // Chuyển hướng đến Dashboard nếu đăng nhập thành công
      navigate('/');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex">
      <Col md={6} className="bg-primary text-white d-flex flex-column justify-content-center p-5 rounded-left">
        <h1 className="display-4 font-weight-bold mb-4">Khám phá sản phẩm mới và cơ hội tuyệt vời</h1>
        <p className="lead mb-4">Khám phá nền tảng của chúng tôi để mở ra những cơ hội mới và tạo ra khả năng phát triển vô hạn.</p>
        <Button variant="light" className="d-flex align-items-center justify-content-center mb-4 shadow-lg">
          <FaPlay className="mr-2" /> Xem Video
        </Button>
        <p className="lead">Hơn 10.000 người dùng hạnh phúc</p>
        <p className="lead">Hỗ trợ 5.000 doanh nghiệp phát triển</p>
      </Col>

      <Col md={6} className="p-5 d-flex justify-content-center align-items-center">
        <Card className="shadow-lg w-100" style={{ maxWidth: '500px' }}>
          <Card.Body>
            <h2 className="text-center mb-4 font-weight-bold text-primary">Đăng nhập</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label className="font-weight-bold">Tên đăng nhập</Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdMailOutline className="mr-2 text-muted" size={20} />
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
                <Form.Label className="font-weight-bold">Mật khẩu</Form.Label>
                <div className="d-flex align-items-center bg-light p-3 rounded-lg shadow-sm">
                  <MdLockOutline className="mr-2 text-muted" size={20} />
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

export default Login; // Đảm bảo export mặc định
