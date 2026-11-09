import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import StarRating from './StarRating';

const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// Component ProductCard: Hiển thị thẻ tóm tắt thông tin sản phẩm và nút thêm nhanh vào giỏ hàng
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // Xử lý thêm sản phẩm vào giỏ hàng mà không kích hoạt chuyển trang của thẻ Link bọc ngoài
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, { position: 'bottom-right', autoClose: 2000 });
    };

    // Tính phần trăm giảm giá nếu sản phẩm có giá gốc (oldPrice)
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null;

    return (
        <div className="product-card h-100">
            {/* Liên kết điều hướng đến trang chi tiết sản phẩm */}
            <Link to={`/products/${product.id}`} className="text-decoration-none">
                {/* Khối ảnh sản phẩm và các nhãn trạng thái (giảm giá, mới, hot, bán chạy) */}
                <div className="product-img-wrap position-relative overflow-hidden">
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="product-img"
                    />
                    <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
                        {discount && (
                            <span className="badge bg-danger">-{discount}%</span>
                        )}
                        {product.tags?.includes('new') && (
                            <span className="badge" style={{ background: '#7c3aed' }}>Mới</span>
                        )}
                        {product.tags?.includes('hot') && (
                            <span className="badge bg-warning text-dark">Hot</span>
                        )}
                        {product.tags?.includes('bestseller') && (
                            <span className="badge bg-success">Bán chạy</span>
                        )}
                    </div>
                    {!product.visible && (
                        <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-secondary">Ẩn</span>
                        </div>
                    )}
                </div>
                {/* Khối thông tin sản phẩm: thương hiệu, tên, đánh giá sao, giá bán và cấu hình tóm tắt */}
                <div className="product-body">
                    <p className="product-brand">{product.brand}</p>
                    <h6 className="product-name">{product.name}</h6>
                    <div className="d-flex align-items-center gap-1 mb-2">
                        <StarRating value={product.rating} size="sm" />
                        <small className="text-muted">({product.reviewCount})</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                        <div>
                            <span className="product-price">{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                                <span className="product-old-price ms-2">{formatPrice(product.oldPrice)}</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 d-flex gap-1 flex-wrap">
                        {product.specs?.cpu && <span className="spec-badge">{product.specs.cpu.split(' ').slice(-2).join(' ')}</span>}
                        {product.specs?.ram && <span className="spec-badge">{product.specs.ram.split(' ')[0]}</span>}
                        {product.specs?.storage && <span className="spec-badge">{product.specs.storage.split(' ')[0]}</span>}
                    </div>
                </div>
            </Link>
            <div className="product-footer px-3 pb-3">
                <button
                    className="btn btn-add-cart w-100 btn-sm"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <i className="bi bi-cart-plus me-2"></i>
                    {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
