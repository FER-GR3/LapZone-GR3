import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', boxShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <i className="bi bi-laptop fs-3" style={{ color: '#38bdf8' }}></i>
                    <div>
                        <span className="fw-bold fs-5" style={{ color: '#38bdf8' }}>Laptop</span>
                        <span className="fw-bold fs-5 text-white">Zone</span>
                    </div>
                </Link>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
                        <li className="nav-item">
                            <NavLink className="nav-link fw-medium" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fw-medium" to="/products">Sản phẩm</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link fw-medium dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                Danh mục
                            </span>
                            <ul className="dropdown-menu dropdown-menu-dark border-0 shadow">
                                <li><Link className="dropdown-item" to="/products?category=1"><i className="bi bi-controller me-2 text-danger"></i>Gaming</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=2"><i className="bi bi-briefcase me-2 text-primary"></i>Văn phòng</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=3"><i className="bi bi-phone me-2 text-info"></i>Siêu mỏng</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=4"><i className="bi bi-mortarboard me-2 text-success"></i>Sinh viên</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=5"><i className="bi bi-palette me-2 text-warning"></i>Đồ họa</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-3">
                        {/* Giỏ hàng */}
                        <Link to="/cart" className="btn btn-outline-light btn-sm position-relative">
                            <i className="bi bi-cart3 fs-5"></i>
                        </Link>
                        {/* Người dùng đăng nhập */}
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-sm d-flex align-items-center gap-2 text-white border border-secondary rounded-pill px-3" data-bs-toggle="dropdown">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 28, height: 28, background: '#38bdf8', color: '#0f172a', fontWeight: 700, fontSize: 13 }}>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="fw-medium">{user.name}</span>
                                    <i className="bi bi-chevron-down small"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark border-0 shadow mt-1">
                                    <li><span className="dropdown-item-text text-muted small">{user.email}</span></li>
                                    <li><hr className="dropdown-divider border-secondary" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-outline-light btn-sm fw-medium">Đăng nhập</Link>
                                <Link to="/register" className="btn btn-sm fw-medium" style={{ background: '#38bdf8', color: '#0f172a' }}>Đăng ký</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Header;
