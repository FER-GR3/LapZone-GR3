import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Trang Home tạm thời cho Sprint 1 của Thành viên 1
const HomeSprint1 = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-primary fw-bold mb-3">LaptopZone - Sprint 1</h2>
        <p className="text-muted">Chức năng Sprint 1: Quản lý Người dùng & Xác thực (Member 1)</p>
        
        {user ? (
          <div className="alert alert-success mt-3">
            <h5 className="fw-bold">Xin chào, {user.name}!</h5>
            <p className="mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="mb-1"><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</p>
            <p className="mb-1"><strong>Vai trò:</strong> <span className="badge bg-primary">{user.role}</span></p>
            <button onClick={logout} className="btn btn-outline-danger btn-sm mt-3">
              <i className="bi bi-box-arrow-right me-1"></i>Đăng xuất
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/login" className="btn btn-primary px-4">
              <i className="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-outline-primary px-4">
              <i className="bi bi-person-plus me-1"></i>Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeSprint1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
