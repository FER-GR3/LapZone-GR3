import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Xin chào, {user?.name || 'Quản trị viên'}!</h4>
                    <p className="text-muted small mb-0">Chào mừng bạn đến với bảng điều khiển trung tâm của LaptopZone.</p>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-white rounded-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 p-3 bg-primary bg-opacity-10 text-primary fs-3">
                                <i className="bi bi-tags"></i>
                            </div>
                            <div>
                                <span className="text-muted small">Danh mục</span>
                                <h4 className="fw-bold mb-0">5 Loại</h4>
                                <Link to="/admin/categories" className="small text-primary text-decoration-none">Quản lý ngay →</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-white rounded-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success fs-3">
                                <i className="bi bi-laptop"></i>
                            </div>
                            <div>
                                <span className="text-muted small">Sản phẩm laptop</span>
                                <h4 className="fw-bold mb-0">4 Sản phẩm</h4>
                                <span className="small text-muted">Đang kinh doanh</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0 p-3 bg-white rounded-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 p-3 bg-warning bg-opacity-10 text-warning fs-3">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <div>
                                <span className="text-muted small">Trạng thái hệ thống</span>
                                <h4 className="fw-bold mb-0 text-success">Hoạt động</h4>
                                <span className="small text-muted">Cổng REST API 5000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
