import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const formatPrice = (p) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleRemove = (productId) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            removeFromCart(productId);
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center min-vh-75">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: '5rem' }}></i>
                <h4 className="fw-bold mt-3">Giỏ hàng của bạn đang trống</h4>
                <p className="text-muted">Hãy chọn cho mình mẫu laptop ưng ý nhất tại LaptopZone nhé!</p>
                <Link to="/" className="btn btn-primary px-4 py-2 mt-2">
                    <i className="bi bi-arrow-left me-2"></i>Khám phá sản phẩm ngay
                </Link>
            </div>
        );
    }

    return (
        <div className="py-4 bg-light min-vh-100">
            <div className="container">
                <h3 className="fw-bold mb-4">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h3>

                <div className="row g-4">
                    {/* Danh sách các sản phẩm */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 p-3 mb-3">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Đơn giá</th>
                                            <th className="text-center">Số lượng</th>
                                            <th className="text-end">Tạm tính</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.productId}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <img
                                                            src={item.image || 'https://via.placeholder.com/80x60'}
                                                            alt={item.name}
                                                            className="rounded border"
                                                            style={{ width: '70px', height: '55px', objectFit: 'cover' }}
                                                        />
                                                        <div>
                                                            <Link to={`/products/${item.productId}`} className="fw-medium text-decoration-none text-dark">
                                                                {item.name}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{formatPrice(item.price)}</td>
                                                <td style={{ width: '130px' }}>
                                                    <div className="input-group input-group-sm">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        >-</button>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center bg-white"
                                                            value={item.quantity}
                                                            readOnly
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        >+</button>
                                                    </div>
                                                </td>
                                                <td className="text-end fw-bold text-primary">
                                                    {formatPrice(item.price * item.quantity)}
                                                </td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-outline-danger border-0"
                                                        onClick={() => handleRemove(item.productId)}
                                                        title="Xóa món này"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                                <Link to="/" className="btn btn-outline-secondary btn-sm">
                                    <i className="bi bi-arrow-left me-1"></i>Tiếp tục mua hàng
                                </Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
                                    <i className="bi bi-trash me-1"></i>Xóa tất cả
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Hộp tóm tắt đơn hàng */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 p-4">
                            <h5 className="fw-bold mb-3">Tóm tắt đơn hàng</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Tổng tiền hàng:</span>
                                <span className="fw-medium">{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Phí vận chuyển:</span>
                                <span className="text-success fw-medium">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bold fs-5">Thành tiền:</span>
                                <span className="fw-bold fs-5 text-primary">{formatPrice(cartTotal)}</span>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2 fw-medium"
                                onClick={() => navigate('/checkout')}
                            >
                                Tiến hành thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
