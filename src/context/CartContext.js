import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// CartProvider: Quản lý trạng thái giỏ hàng toàn cục và tự động lưu trữ vào localStorage
export const CartProvider = ({ children }) => {
    // Khởi tạo danh sách sản phẩm trong giỏ từ localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('lz_cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Tự động đồng bộ giỏ hàng vào localStorage mỗi khi cartItems thay đổi
    useEffect(() => {
        localStorage.setItem('lz_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ: cộng dồn số lượng nếu đã có, hoặc thêm mới nếu chưa có
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
                    productId: Number(product.id),
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || '',
                    quantity,
                    stock: product.stock,
                },
            ];
        });
    };

    // Xóa một sản phẩm khỏi giỏ hàng theo productId
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    // Cập nhật số lượng của một sản phẩm trong giỏ hàng
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    // Làm trống toàn bộ giỏ hàng và tính tổng tiền / tổng số lượng sản phẩm
    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
