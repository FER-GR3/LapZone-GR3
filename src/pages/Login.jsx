import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.email.trim()) e.email = 'Vui lòng nhập email';
        if (!form.password) e.password = 'Vui lòng nhập mật khẩu';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            toast.success(`Chào mừng ${user.name} đã quay trở lại!`);
            navigate(user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            toast.error(err.message || 'Đăng nhập không thành công');
        } finally {
            setLoading(false);
        }
    };

    // Nút điền nhanh tài khoản demo cho giảng viên chấm bài
    const fillDemo = (role) => {
        if (role === 'admin') {
            setForm({ email: 'admin@laptopzone.vn', password: 'admin123' });
        } else {
            setForm({ email: 'user@laptopzone.vn', password: 'user123' });
        }
    };

    return (
        <div className="auth-page d-flex align-items-center justify-content-center py-5">
            <div className="auth-card shadow p-4 rounded bg-white" style={{ maxWidth: '420px', width: '100%' }}>
                <div className="text-center mb-4">
                    <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-2">
                        <i className="bi bi-laptop fs-3 text-primary"></i>
                        <span className="fw-bold fs-4 text-dark">LaptopZone</span>
                    </Link>
                    <h4 className="fw-bold mt-2">Đăng nhập</h4>
                    <p className="text-muted small">Chào mừng bạn quay trở lại!</p>
                </div>

                {/* Tiện ích test demo cho Giảng viên */}
                <div className="d-flex gap-2 mb-3">
                    <button type="button" className="btn btn-outline-primary btn-sm flex-fill" onClick={() => fillDemo('user')}>
                        Demo User
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm flex-fill" onClick={() => fillDemo('admin')}>
                        Demo Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope text-muted"></i></span>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-medium">Mật khẩu</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock text-muted"></i></span>
                            <input
                                type={showPass ? 'text' : 'password'}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <button type="button" className="input-group-text" onClick={() => setShowPass(!showPass)}>
                                <i className={`bi bi-eye${showPass ? '-slash' : ''}`}></i>
                            </button>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fw-medium" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>

                <p className="text-center mt-3 small text-muted">
                    Chưa có tài khoản? <Link to="/register" className="text-primary text-decoration-none fw-medium">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
