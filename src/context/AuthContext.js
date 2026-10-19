import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserByEmail, createUser } from '../services/api';

const AuthContext = createContext(null);
const STORAGE_KEY = 'lz_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Khi F5 tải lại trang: Khôi phục phiên làm việc từ localStorage
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem(STORAGE_KEY);
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (e) {
            console.error('Lỗi đọc session:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    // [Task-04] Xử lý Đăng nhập
    const login = async (email, password) => {
        const users = await getUserByEmail(email.trim().toLowerCase());
        if (!users || users.length === 0) {
            throw new Error('Email không tồn tại trong hệ thống');
        }
        const found = users[0];
        if (found.password !== password) {
            throw new Error('Mật khẩu không chính xác');
        }
        setUser(found);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        return found;
    };

    // [Task-01 & Task-03] Xử lý Đăng ký (Create User)
    const register = async ({ name, email, password, phone = '', address = '' }) => {
        const normalizedEmail = email.trim().toLowerCase();

        // Kiểm tra trùng email
        const existing = await getUserByEmail(normalizedEmail);
        if (existing && existing.length > 0) {
            throw new Error('Email này đã được sử dụng');
        }

        const newUser = {
            name: name.trim(),
            email: normalizedEmail,
            password: password,
            phone: phone.trim(),
            address: address.trim(),
            role: 'user',
            avatar: ''
        };

        const createdAccount = await createUser(newUser);
        setUser(createdAccount);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(createdAccount));
        return createdAccount;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider');
    return context;
};
