// Import useCart:
import { useCart } from '../context/CartContext';
const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // Lấy hàm addToCart
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };