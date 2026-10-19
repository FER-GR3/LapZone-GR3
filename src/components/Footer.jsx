import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', color: '#94a3b8' }}>
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-laptop fs-3" style={{ color: '#38bdf8' }}></i>
                            <div>
                                <span className="fw-bold fs-4" style={{ color: '#38bdf8' }}>Laptop</span>
                                <span className="fw-bold fs-4 text-white">Zone</span>
                            </div>
                        </div>
                        <p className="small lh-lg">
                            Chuyên cung cấp laptop chính hãng từ các thương hiệu hàng đầu.
                            Bảo hành 12 - 24 tháng, hỗ trợ trả góp 0%, giao hàng toàn quốc.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-white fw-bold mb-3 text-uppercase">Danh mục</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><Link to="/products?category=1" className="text-decoration-none text-muted">Gaming</Link></li>
                            <li className="mb-2"><Link to="/products?category=2" className="text-decoration-none text-muted">Văn phòng</Link></li>
                            <li className="mb-2"><Link to="/products?category=3" className="text-decoration-none text-muted">Siêu mỏng</Link></li>
                            <li className="mb-2"><Link to="/products?category=4" className="text-decoration-none text-muted">Sinh viên</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-white fw-bold mb-3 text-uppercase">Chính sách</h6>
                        <ul className="list-unstyled small text-muted">
                            <li className="mb-2">Bảo hành chính hãng</li>
                            <li className="mb-2">Đổi trả trong 30 ngày</li>
                            <li className="mb-2">Giao hàng miễn phí toàn quốc</li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-white fw-bold mb-3 text-uppercase">Liên hệ</h6>
                        <ul className="list-unstyled small text-muted">
                            <li className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-primary"></i>123 Nguyễn Huệ, Quận 1, TP.HCM</li>
                            <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-primary"></i>1800 1234 (Miễn phí)</li>
                            <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-primary"></i>support@laptopzone.vn</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container py-3 text-center small">
                    <p className="mb-0">© 2026 LaptopZone - Assignment Group FER202. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
