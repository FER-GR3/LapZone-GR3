import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import { toast } from 'react-toastify';

const formatPrice = (p) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error('Không tìm thấy sản phẩm:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, qty);
        toast.success(`Đã thêm ${qty} "${product.name}" vào giỏ hàng!`);
    };

    const handleBuyNow = () => {
        if (!product) return;
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status"></div>
                <span className="ms-2">Đang tải thông tin laptop...</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h4>Không tìm thấy sản phẩm!</h4>
                <Link to="/" className="btn btn-primary mt-3">Quay về trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="py-4 bg-light min-vh-100">
            <div className="container">
                {/* Breadcrumb điều hướng */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Trang chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Sản phẩm</Link></li>
                        <li className="breadcrumb-item active text-truncate" style={{ maxWidth: '300px' }}>{product.name}</li>
                    </ol>
                </nav>

                <div className="card shadow-sm border-0 p-4 mb-4">
                    <div className="row g-4">
                        {/* Ảnh sản phẩm */}
                        <div className="col-lg-6 text-center">
                            <img
                                src={product.images?.[0] || 'https://via.placeholder.com/600x400?text=Laptop'}
                                alt={product.name}
                                className="img-fluid rounded-3 border"
                                style={{ maxHeight: '380px', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thông tin & Nút mua */}
                        <div className="col-lg-6">
                            <span className="badge bg-secondary mb-2">{product.brand}</span>
                            <h3 className="fw-bold">{product.name}</h3>

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <StarRating value={product.rating || 5} size="md" />
                                <span className="text-muted small">({product.reviewCount || 0} đánh giá)</span>
                                <span className="text-success ms-2 small"><i className="bi bi-check-circle-fill me-1"></i>Còn hàng ({product.stock} máy)</span>
                            </div>

                            <div className="p-3 bg-light rounded-3 mb-3">
                                <h3 className="text-primary fw-bold mb-0">{formatPrice(product.price)}</h3>
                                {product.oldPrice && (
                                    <span className="text-muted text-decoration-line-through small me-2">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>

                            <p className="text-muted">{product.description}</p>

                            {/* Cấu hình kỹ thuật */}
                            {product.specs && (
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Thông số cấu hình:</h6>
                                    <ul className="list-group list-group-flush small">
                                        <li className="list-group-item bg-transparent px-0 py-1"><strong>CPU:</strong> {product.specs.cpu}</li>
                                        <li className="list-group-item bg-transparent px-0 py-1"><strong>RAM:</strong> {product.specs.ram}</li>
                                        <li className="list-group-item bg-transparent px-0 py-1"><strong>Ổ cứng:</strong> {product.specs.storage}</li>
                                        <li className="list-group-item bg-transparent px-0 py-1"><strong>Màn hình:</strong> {product.specs.display}</li>
                                    </ul>
                                </div>
                            )}

                            {/* Chọn số lượng */}
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <span className="fw-medium">Số lượng:</span>
                                <div className="input-group" style={{ width: '130px' }}>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                                    <input type="text" className="form-control text-center bg-white" value={qty} readOnly />
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => setQty(q => Math.min(product.stock || 10, q + 1))}>+</button>
                                </div>
                            </div>

                            {/* Nút thao tác */}
                            <div className="d-flex gap-3">
                                <button className="btn btn-outline-primary btn-lg flex-grow-1" onClick={handleAddToCart}>
                                    <i className="bi bi-cart-plus me-2"></i>Thêm vào giỏ
                                </button>
                                <button className="btn btn-primary btn-lg flex-grow-1" onClick={handleBuyNow}>
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
