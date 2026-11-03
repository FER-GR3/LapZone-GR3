import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const BRANDS = ['ASUS', 'MSI', 'Lenovo', 'Dell', 'HP', 'Apple', 'Acer', 'Razer', 'LG', 'Microsoft'];
const PRICE_RANGES = [
    { label: 'Dưới 15 triệu', min: 0, max: 15000000 },
    { label: '15 - 25 triệu', min: 15000000, max: 25000000 },
    { label: '25 - 35 triệu', min: 25000000, max: 35000000 },
    { label: '35 - 50 triệu', min: 35000000, max: 50000000 },
    { label: 'Trên 50 triệu', min: 50000000, max: 999000000 },
];

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        brand: searchParams.get('brand') || '',
        priceRange: '',
        tag: searchParams.get('tag') || '',
        search: searchParams.get('q') || '',
    });
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
    const limit = 12;

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const all = await getProducts();
            let result = all.filter(p => p.visible !== false);

            if (filters.category) {
                const cat = categories.find(c => c.slug === filters.category);
                if (cat) result = result.filter(p => p.categoryId === cat.id);
            }
            if (filters.brand) {
                result = result.filter(p => p.brand?.toLowerCase() === filters.brand.toLowerCase());
            }
            if (filters.priceRange !== '') {
                const range = PRICE_RANGES[Number(filters.priceRange)];
                if (range) result = result.filter(p => p.price >= range.min && p.price <= range.max);
            }
            if (filters.tag) {
                result = result.filter(p => p.tags?.includes(filters.tag));
            }
            if (filters.search) {
                const q = filters.search.toLowerCase();
                result = result.filter(p =>
                    p.name?.toLowerCase().includes(q) ||
                    p.brand?.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q)
                );
            }

            if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
            else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
            else if (sort === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            else if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

            setTotal(result.length);
            const start = (page - 1) * limit;
            setProducts(result.slice(start, start + limit));
        } finally {
            setLoading(false);
        }
    }, [filters, sort, page, categories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (key, value) => {
        const next = { ...filters, [key]: value };
        setFilters(next);
        setPage(1);
        const p = new URLSearchParams();
        if (next.category) p.set('category', next.category);
        if (next.brand) p.set('brand', next.brand);
        if (next.tag) p.set('tag', next.tag);
        if (next.search) p.set('q', next.search);
        setSearchParams(p);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleFilterChange('search', searchInput);
    };

    const handleReset = () => {
        setFilters({ category: '', brand: '', priceRange: '', tag: '', search: '' });
        setSearchInput('');
        setSort('');
        setPage(1);
        setSearchParams({});
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="py-4" style={{ background: '#f8fafc', minHeight: '80vh' }}>
            <div className="container">
                {/* Search Bar + Active filters count */}
                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                    <form onSubmit={handleSearchSubmit} className="d-flex gap-2" style={{ maxWidth: 420, width: '100%' }}>
                        <div className="input-group">
                            <span className="input-group-text bg-white"><i className="bi bi-search text-muted"></i></span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Tìm theo tên laptop, hãng..."
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                            />
                            {searchInput && (
                                <button type="button" className="btn btn-outline-secondary" onClick={() => { setSearchInput(''); handleFilterChange('search', ''); }}>
                                    <i className="bi bi-x"></i>
                                </button>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">Tìm</button>
                    </form>

                    <div className="d-flex align-items-center gap-3">
                        <span className="text-muted small">Tìm thấy <strong>{total}</strong> sản phẩm</span>
                        <select className="form-select form-select-sm" style={{ width: 180 }} value={sort} onChange={e => setSort(e.target.value)}>
                            <option value="">Sắp xếp mặc định</option>
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá: Thấp đến Cao</option>
                            <option value="price-desc">Giá: Cao đến Thấp</option>
                            <option value="rating">Đánh giá cao nhất</option>
                        </select>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Sidebar filters */}
                    <div className="col-lg-3">
                        <div className="filter-sidebar card border-0 shadow-sm p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold mb-0"><i className="bi bi-funnel me-2"></i>Bộ lọc</h6>
                                <button className="btn btn-link btn-sm text-muted p-0 text-decoration-none" onClick={handleReset}>Xoá lọc</button>
                            </div>

                            {/* Categories */}
                            <div className="filter-group mb-3">
                                <div className="filter-title fw-semibold small text-uppercase text-muted mb-2">Danh mục</div>
                                <div className="d-flex flex-column gap-1">
                                    <button
                                        className={`filter-btn text-start ${filters.category === '' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('category', '')}
                                    >
                                        Tất cả danh mục
                                    </button>
                                    {categories.map(c => (
                                        <button
                                            key={c.id}
                                            className={`filter-btn text-start ${filters.category === c.slug ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('category', c.slug)}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="filter-group mb-3">
                                <div className="filter-title fw-semibold small text-uppercase text-muted mb-2">Thương hiệu</div>
                                <div className="d-flex flex-wrap gap-1">
                                    {BRANDS.map(b => (
                                        <button
                                            key={b}
                                            className={`btn btn-xs ${filters.brand === b ? 'btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleFilterChange('brand', filters.brand === b ? '' : b)}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price range */}
                            <div className="filter-group mb-3">
                                <div className="filter-title fw-semibold small text-uppercase text-muted mb-2">Mức giá</div>
                                <div className="d-flex flex-column gap-1">
                                    {PRICE_RANGES.map((r, i) => (
                                        <div key={r.label} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="priceRange"
                                                id={`pr-${i}`}
                                                checked={filters.priceRange === String(i)}
                                                onChange={() => setFilters(f => ({ ...f, priceRange: String(i) }))}
                                            />
                                            <label className="form-check-label small" htmlFor={`pr-${i}`}>{r.label}</label>
                                        </div>
                                    ))}
                                    {filters.priceRange !== '' && (
                                        <button className="btn btn-link btn-sm text-start p-0 text-muted" onClick={() => setFilters(f => ({ ...f, priceRange: '' }))}>
                                            Bỏ chọn giá
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="filter-group">
                                <div className="filter-title fw-semibold small text-uppercase text-muted mb-2">Khác</div>
                                <div className="d-flex flex-wrap gap-1">
                                    {[['new', 'Mới'], ['hot', 'Hot'], ['sale', 'Giảm giá'], ['bestseller', 'Bán chạy']].map(([tag, label]) => (
                                        <button
                                            key={tag}
                                            className={`btn btn-xs ${filters.tag === tag ? 'btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleFilterChange('tag', filters.tag === tag ? '' : tag)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products grid */}
                    <div className="col-lg-9">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
                                <div className="spinner-border" style={{ color: '#38bdf8' }}></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-5 card border-0 shadow-sm">
                                <i className="bi bi-inbox fs-1 text-muted mb-2"></i>
                                <h5>Không tìm thấy sản phẩm phù hợp</h5>
                                <p className="text-muted small">Hãy thử thay đổi tiêu chí lọc hoặc từ khoá tìm kiếm</p>
                                <div><button className="btn btn-outline-primary btn-sm" onClick={handleReset}>Xoá bộ lọc</button></div>
                            </div>
                        ) : (
                            <>
                                <div className="row g-3">
                                    {products.map(p => (
                                        <div key={p.id} className="col-xl-4 col-md-6">
                                            <ProductCard product={p} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                                        <button className="btn btn-sm btn-outline-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                                            <i className="bi bi-chevron-left"></i>
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                            <button
                                                key={num}
                                                className={`btn btn-sm ${page === num ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                onClick={() => setPage(num)}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                        <button className="btn btn-sm btn-outline-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                                            <i className="bi bi-chevron-right"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;