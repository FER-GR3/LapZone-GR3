const BASE_URL = 'http://localhost:5000';

const request = async (url, options = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
};

// Users API Endpoints (CRUD)
export const getUsers = () => request('/users');
export const getUserById = (id) => request(`/users/${id}`);
export const getUserByEmail = (email) => request(`/users?email=${encodeURIComponent(email)}`);
export const createUser = (data) => request('/users', { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
