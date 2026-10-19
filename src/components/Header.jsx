// Thêm import useCart ở đầu file:
import { useCart } from '../context/CartContext';
// Trong component Header:
const Header = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart(); // Lấy số lượng từ CartContext
    const navigate = useNavigate();
    // ...
    // Phần nút Giỏ hàng:
    <Link to="/cart" className="btn btn-outline-light btn-sm position-relative">
        <i className="bi bi-cart3 fs-5"></i>
        {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
            </span>
        )}
    </Link>
