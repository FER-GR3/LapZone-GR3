import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'lz_cart';

export const CartProvider = ({ children }) => {
    // Khôi phục giỏ hàng từ localStorage khi tải lại trang
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Tự động đồng bộ giỏ hàng vào localStorage mỗi khi state thay đổi
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (e) {
            console.error('Lỗi lưu localStorage:', e);
        }
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.productId === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || '',
                    quantity,
                    stock: product.stock || 10,
                },
            ];
        });
    };

    // Xóa 1 sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    // Cập nhật số lượng sản phẩm (giới hạn tối thiểu là 1)
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    // Xóa sạch giỏ hàng (khi đặt hàng thành công)
    const clearCart = () => setCartItems([]);

    // Tổng tiền và tổng số lượng món hàng
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart phải được bọc trong CartProvider');
    return context;
};
