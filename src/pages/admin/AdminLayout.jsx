import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { path: '/admin', icon: 'speedometer2', label: 'Tổng quan (Dashboard)', exact: true },
        { path: '/admin/categories', icon: 'tags', label: 'Quản lý Danh mục' },
        { path: '/admin/products', icon: 'box-seam', label: 'Quản lý Sản phẩm' },
    ];

    const isActive = (path, exact) =>
        exact ? location.pathname === path : location.pathname.startsWith(path);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout d-flex" style={{ minHeight: '100vh' }}>
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
                        <i className="bi bi-laptop fs-4 text-primary"></i>
                        {sidebarOpen && <span className="fw-bold text-white fs-5">LaptopZone</span>}
                    </Link>
                    <button className="btn btn-sm text-white-50 p-0 border-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className={`bi bi-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                        >
                            <i className={`bi bi-${item.icon}`}></i>
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-nav-item mb-1">
                        <i className="bi bi-arrow-left-circle"></i>
                        {sidebarOpen && <span>Về Website</span>}
                    </Link>
                    <button className="sidebar-nav-item text-danger border-0 bg-transparent w-100 text-start" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-left"></i>
                        {sidebarOpen && <span>Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            <div className="admin-main flex-grow-1 bg-light">
                <header className="admin-header bg-white px-4 py-3 d-flex justify-content-between align-items-center border-bottom shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-sm btn-outline-secondary d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <i className="bi bi-list"></i>
                        </button>
                        <h5 className="mb-0 fw-bold text-dark">Trang Quản Trị Hệ Thống</h5>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-danger me-1">Admin</span>
                        <span className="fw-medium text-dark">{user?.name}</span>
                    </div>
                </header>

                <main className="admin-content p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
