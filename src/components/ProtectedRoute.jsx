import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Bảo vệ các route yêu cầu đăng nhập: chuyển hướng về trang Login nếu chưa đăng nhập
export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

// Bảo vệ các route quản trị: chỉ cho phép tài khoản có role là 'admin' truy cập
export const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
};
