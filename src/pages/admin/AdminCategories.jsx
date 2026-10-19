import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';
import { toast } from 'react-toastify';

const EMPTY_FORM = { name: '', slug: '', description: '', image: '' };

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            toast.error('Lỗi tải danh mục!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const openCreate = () => {
        setEditing(null);
        setForm(EMPTY_FORM);
        setShowModal(true);
    };

    const openEdit = (cat) => {
        setEditing(cat);
        setForm({ ...cat });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const autoSlug = (name) => {
        const s = name.toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setForm(prev => ({ ...prev, name, slug: s }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error('Vui lòng nhập tên danh mục!');
            return;
        }

        setSaving(true);
        try {
            if (editing) {
                await updateCategory(editing.id, form);
                toast.success('Cập nhật danh mục thành công!');
            } else {
                await createCategory(form);
                toast.success('Thêm danh mục mới thành công!');
            }
            setShowModal(false);
            loadData();
        } catch (err) {
            toast.error('Lưu danh mục thất bại!');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (cat) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`)) return;
        try {
            await deleteCategory(cat.id);
            toast.success(`Đã xóa danh mục "${cat.name}" thành công!`);
            loadData();
        } catch (err) {
            toast.error('Xóa danh mục thất bại!');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Quản lý Danh mục</h4>
                    <p className="text-muted small mb-0">Thêm, sửa thông tin và phân loại laptop theo danh mục.</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <i className="bi bi-plus-lg me-1"></i>Thêm danh mục
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '80px' }}>Ảnh</th>
                                <th>Tên danh mục</th>
                                <th>Đường dẫn (Slug)</th>
                                <th>Mô tả</th>
                                <th className="text-end" style={{ width: '140px' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        <div className="spinner-border spinner-border-sm text-primary"></div>
                                        <span className="ms-2">Đang tải danh mục...</span>
                                    </td>
                                </tr>
                            ) : categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>
                                        <img
                                            src={cat.image || 'https://via.placeholder.com/60'}
                                            alt={cat.name}
                                            className="rounded border"
                                            style={{ width: '55px', height: '40px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td><strong>{cat.name}</strong></td>
                                    <td><code>{cat.slug}</code></td>
                                    <td className="small text-muted">{cat.description}</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(cat)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow border-0 rounded-3">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">{editing ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSave}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label small fw-medium">Tên danh mục *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.name}
                                            onChange={(e) => autoSlug(e.target.value)}
                                            placeholder="Ví dụ: Laptop Đồ Họa"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-medium">Slug (Tự động sinh)</label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            name="slug"
                                            value={form.slug}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-medium">Mô tả tóm tắt</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="3"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Mô tả danh mục..."
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-medium">URL Ảnh minh họa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="image"
                                            value={form.image}
                                            onChange={handleChange}
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary btn-sm px-3" disabled={saving}>
                                        {saving ? 'Đang lưu...' : 'Lưu dữ liệu'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
