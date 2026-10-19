import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const BRANDS = ['ASUS', 'Dell', 'Lenovo', 'Apple', 'HP', 'MSI', 'Acer'];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
                setProducts(prods);
                setCategories(cats);
            } catch (err) {
                console.error('Lỗi tải dữ liệu trang chủ:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const catIcons = { 1: 'controller', 2: 'briefcase', 3: 'phone', 4: 'mortarboard', 5: 'palette' };

    return (
        <div>
            {/* HERO BANNER */}
            <section className="hero-section text-white py-5">
                <div className="container">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6">
                            <span className="badge bg-primary mb-3 px-3 py-2">🔥 Ưu đãi Mùa Khai Giảng - Giảm đến 30%</span>
                            <h1 className="display-4 fw-bold mb-3">
                                Tìm Laptop <span style={{ color: '#38bdf8' }}>Hoàn Hảo</span> Cho Bạn
                            </h1>
                            <p className="lead text-light opacity-75 mb-4">
                                Hơn 100+ mẫu laptop chính hãng từ các thương hiệu hàng đầu thế giới. Bảo hành chính hãng, trả góp 0%.
                            </p>
                            <div className="d-flex gap-3">
                                <button onClick={() => navigate('/products')} className="btn btn-primary btn-lg px-4">
                                    <i className="bi bi-grid me-2"></i>Khám phá ngay
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block text-center">
                            <img
                                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80"
                                alt="Laptop Hero"
                                className="img-fluid rounded-4 shadow-lg"
                                style={{ maxHeight: '380px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* BRAND LOGOS */}
            <section className="py-3 bg-light border-bottom">
                <div className="container text-center">
                    <span className="text-muted small fw-bold me-3 text-uppercase">Thương hiệu đối tác:</span>
                    <div className="d-inline-flex gap-3 flex-wrap justify-content-center mt-2">
                        {BRANDS.map(brand => (
                            <span key={brand} className="badge bg-white text-dark border px-3 py-2 fs-6">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Danh Mục Nổi Bật</h2>
                        <p className="text-muted">Lựa chọn laptop phù hợp với nhu cầu của bạn</p>
                    </div>
                    <div className="row g-3">
                        {categories.map(cat => (
                            <div key={cat.id} className="col-lg col-md-4 col-6">
                                <div className="card h-100 text-center p-3 category-card border shadow-sm" style={{ cursor: 'pointer' }}>
                                    <div className="fs-1 text-primary mb-2">
                                        <i className={`bi bi-${catIcons[cat.id] || 'laptop'}`}></i>
                                    </div>
                                    <h6 className="fw-bold mb-1">{cat.name}</h6>
                                    <small className="text-muted">{cat.description?.slice(0, 35)}...</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Sản Phẩm Bán Chạy</h2>
                        <p className="text-muted">Các mẫu laptop được khách hàng lựa chọn nhiều nhất</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="mt-2 text-muted">Đang tải sản phẩm...</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {products.map(prod => (
                                <div key={prod.id} className="col-xl-3 col-lg-4 col-md-6">
                                    <ProductCard product={prod} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
