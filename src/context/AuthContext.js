import React, { createContext, useContext, useState } from 'react';
import { getUserByEmail, createUser, updateUser } from '../services/api';

const AuthContext = createContext(null);

// AuthProvider: Quản lý trạng thái xác thực người dùng toàn cục và đồng bộ với localStorage
export const AuthProvider = ({ children }) => {
    // Khởi tạo thông tin user từ localStorage nếu đã đăng nhập trước đó
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('lz_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // Luồng đăng nhập: Kiểm tra email & mật khẩu qua API -> lưu thông tin user vào state và localStorage
    const login = async (email, password) => {
        const users = await getUserByEmail(email);
        if (!users.length) throw new Error('Email không tồn tại');
        const found = users[0];
        if (found.password !== password) throw new Error('Mật khẩu không đúng');
        setUser(found);
        localStorage.setItem('lz_user', JSON.stringify(found));
        return found;
    };

    // Luồng đăng ký: Kiểm tra trùng email -> tạo tài khoản mới qua API -> tự động đăng nhập
    const register = async ({ name, email, password, phone, address }) => {
        const existing = await getUserByEmail(email);
        if (existing.length) throw new Error('Email đã được sử dụng');
        const newUser = await createUser({
            name,
            email,
            password,
            phone: phone || '',
            address: address || '',
            role: 'user',
            avatar: '',
        });
        setUser(newUser);
        localStorage.setItem('lz_user', JSON.stringify(newUser));
        return newUser;
    };

    // Luồng đăng xuất: Xóa thông tin user khỏi state và localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('lz_user');
    };

    // Luồng cập nhật hồ sơ: Gọi API cập nhật thông tin người dùng và đồng bộ lại state/localStorage
    const updateProfile = async (data) => {
        const updated = await updateUser(user.id, { ...user, ...data });
        setUser(updated);
        localStorage.setItem('lz_user', JSON.stringify(updated));
        return updated;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
