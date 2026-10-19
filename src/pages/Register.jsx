import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // [Bug-01] Hàm validate form chặt chẽ
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Vui lòng nhập họ và tên';

        if (!form.email.trim()) {
            e.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            e.email = 'Email không đúng định dạng';
        }

        if (!form.password) {
            e.password = 'Vui lòng nhập mật khẩu';
        } else if (form.password.length < 6) {
            e.password = 'Mật khẩu phải từ 6 ký tự trở lên';
        }

        if (form.password !== form.confirm) {
            e.confirm = 'Mật khẩu xác nhận không khớp';
        }

        if (form.phone && !/^0\d{9}$/.test(form.phone.trim())) {
            e.phone = 'Số điện thoại phải gồm 10 chữ số (bắt đầu bằng 0)';
        }

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
            await register({
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone
            });
            toast.success('Đăng ký tài khoản thành công!');
            navigate('/');
        } catch (err) {
            toast.error(err.message || 'Đăng ký thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page d-flex align-items-center justify-content-center py-5">
            <div className="auth-card shadow p-4 rounded bg-white" style={{ maxWidth: '440px', width: '100%' }}>
                <div className="text-center mb-4">
                    <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-2">
                        <i className="bi bi-laptop fs-3 text-primary"></i>
                        <span className="fw-bold fs-4 text-dark">LaptopZone</span>
                    </Link>
                    <h4 className="fw-bold mt-2">Tạo tài khoản</h4>
                    <p className="text-muted small">Đăng ký thành viên để mua sắm dễ dàng</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Họ và tên */}
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Họ và tên *</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person text-muted"></i></span>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nguyễn Văn A"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Email *</label>
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

                    {/* Số điện thoại */}
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Số điện thoại</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-phone text-muted"></i></span>
                            <input
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="0901234567"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-3">
                        <label className="form-label small fw-medium">Mật khẩu *</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock text-muted"></i></span>
                            <input
                                type={showPass ? 'text' : 'password'}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Tối thiểu 6 ký tự"
                            />
                            <button type="button" className="input-group-text" onClick={() => setShowPass(!showPass)}>
                                <i className={`bi bi-eye${showPass ? '-slash' : ''}`}></i>
                            </button>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="mb-4">
                        <label className="form-label small fw-medium">Xác nhận mật khẩu *</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock-fill text-muted"></i></span>
                            <input
                                type={showPass ? 'text' : 'password'}
                                className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
                                name="confirm"
                                value={form.confirm}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                            />
                            {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fw-medium" disabled={loading}>
                        {loading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}
                    </button>
                </form>

                <p className="text-center mt-3 small text-muted">
                    Đã có tài khoản? <Link to="/login" className="text-primary text-decoration-none fw-medium">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
