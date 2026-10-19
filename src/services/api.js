const BASE_URL = 'http://localhost:5000';

const request = async (url, options = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
};

// ================= USERS API (Thành viên 1) =================
export const getUsers = () => request('/users');
export const getUserById = (id) => request(`/users/${id}`);
export const getUserByEmail = (email) => request(`/users?email=${encodeURIComponent(email)}`);
export const createUser = (data) => request('/users', { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// ================= CATEGORIES API (Thành viên 2) =================
export const getCategories = () => request('/categories');
export const getCategoryById = (id) => request(`/categories/${id}`);

// ================= PRODUCTS API (Thành viên 2) =================
export const getProducts = (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') query.append(k, v);
    });
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/products${queryString}`);
};
export const getProductById = (id) => request(`/products/${id}`);
