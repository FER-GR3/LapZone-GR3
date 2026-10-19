import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import StarRating from './StarRating';
const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
const ProductCard = ({ product }) => {
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null;
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };
    return (
        <div className="product-card h-100">
            <Link to={`/products/${product.id}`} className="text-decoration-none">
                <div className="product-img-wrap position-relative overflow-hidden">
                    <img
                        src={product.images?.[0] || 'https://via.placeholder.com/300x200?text=Laptop'}
                        alt={product.name}
                        className="product-img"
                    />
                    {/* Huy hiệu nhãn giảm giá */}
                    <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
                        {discount && <span className="badge bg-danger">-{discount}%</span>}
                        {product.tags?.includes('hot') && <span className="badge bg-warning text-dark">Hot</span>}
                        {product.tags?.includes('bestseller') && <span className="badge bg-success">Bán chạy</span>}
                    </div>
                </div>
                <div className="product-body">
                    <p className="product-brand">{product.brand}</p>
                    <h6 className="product-name text-dark fw-bold">{product.name}</h6>

                    <div className="d-flex align-items-center gap-1 mb-2">
                        <StarRating value={product.rating} size="sm" />
                        <small className="text-muted">({product.reviewCount || 0})</small>
                    </div>
                    <div className="d-flex align-items-center flex-wrap gap-1">
                        <span className="product-price">{formatPrice(product.price)}</span>
                        {product.oldPrice && (
                            <span className="product-old-price ms-2">{formatPrice(product.oldPrice)}</span>
                        )}
                    </div>
                    {/* Cấu hình vắn tắt */}
                    {product.specs && (
                        <div className="mt-2 d-flex gap-1 flex-wrap">
                            {product.specs.cpu && <span className="spec-badge">{product.specs.cpu}</span>}
                            {product.specs.ram && <span className="spec-badge">{product.specs.ram}</span>}
                        </div>
                    )}
                </div>
            </Link>
            <div className="product-footer px-3 pb-3">
                <button
                    className="btn btn-primary w-100 btn-sm"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <i className="bi bi-cart-plus me-1"></i>
                    {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                </button>
            </div>
        </div>
    );
};
export default ProductCard;
