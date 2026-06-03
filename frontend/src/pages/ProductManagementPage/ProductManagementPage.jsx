import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { beverageApi } from '../../api/beverageApi';
import { danhMucApi } from '../../api/danhMucApi';
import AddProductPopup from './components/AddProductPopup';
import EditProductPopup from './components/EditProductPopup';
import ConfirmDeletePopup from './components/ConfirmDeletePopup';
import styles from './ProductManagementPage.module.css';

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'CON_HANG', label: 'Còn hàng' },
  { value: 'HET_HANG', label: 'Hết hàng' },
  { value: 'NGUNG_KINH_DOANH', label: 'Ngưng kinh doanh' },
];

const STATUS_MAP = {
  CON_HANG: { label: 'Còn hàng', className: 'statusInStock' },
  HET_HANG: { label: 'Hết hàng', className: 'statusOutOfStock' },
  NGUNG_KINH_DOANH: { label: 'Ngưng kinh doanh', className: 'statusDiscontinued' },
};

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

function ProductManagementPage() {
  const [beverages, setBeverages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingBeverage, setEditingBeverage] = useState(null);
  const [deletingBeverage, setDeletingBeverage] = useState(null);

  // Load categories once
  useEffect(() => {
    danhMucApi.getAll().then((data) => {
      setCategories(data);
    }).catch((err) => {
      console.error('Categories API error:', err.message);
    });
  }, []);

  // Load beverages when filters change
  useEffect(() => {
    const params = {};
    if (filterStatus) params.trangThai = filterStatus;
    if (filterCategory) params.maDanhMuc = Number(filterCategory);
    setLoading(true);
    setError(null);
    beverageApi.getAll(params).then((data) => {
      setLoading(false);
      setError(null);
      setBeverages(data);
    }).catch((err) => {
      console.error('Beverages API error:', err.message);
      setLoading(false);
      setError(err.message || 'Không thể tải danh sách đồ uống. Vui lòng thử lại.');
    });
  }, [filterStatus, filterCategory]);

  const fetchBeverages = () => {
    setLoading(true);
    setError(null);
    const params = {};
    if (filterStatus) params.trangThai = filterStatus;
    if (filterCategory) params.maDanhMuc = Number(filterCategory);
    beverageApi.getAll(params)
      .then((data) => {
        setBeverages(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách đồ uống. Vui lòng thử lại.');
        setLoading(false);
      });
  };

  // Client-side search filter
  const filtered = beverages.filter((b) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (b.maDoUongCode && b.maDoUongCode.toLowerCase().includes(term)) ||
      b.tenDoUong.toLowerCase().includes(term) ||
      (b.tenDanhMuc && b.tenDanhMuc.toLowerCase().includes(term))
    );
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
    }
  };

  const handleAddSuccess = () => {
    setShowAddPopup(false);
    fetchBeverages();
  };

  const handleUpdateSuccess = () => {
    setEditingBeverage(null);
    fetchBeverages();
  };

  const handleDeleteSuccess = () => {
    setDeletingBeverage(null);
    fetchBeverages();
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.pageTitle}>Quản lý đồ uống</h1>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm kiếm đồ uống..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            onKeyDown={handleSearchKeyDown}
          />
            <FaSearch className={styles.searchIcon} />
        </div>

        <select
          className={styles.filterSelect}
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat.maDanhMuc} value={cat.maDanhMuc}>{cat.tenDanhMuc}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>
          + Thêm đồ uống
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button className={styles.retryButton} onClick={fetchBeverages}>
            Tải lại
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className={styles.loading}>Đang tải dữ liệu...</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã món</th>
                <th>Tên đồ uống</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>
                    Không tìm thấy đồ uống nào.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((b) => {
                  const statusInfo = STATUS_MAP[b.trangThai] || STATUS_MAP.CON_HANG;
                  return (
                    <tr key={b.maDoUong}>
                      <td>{b.maDoUongCode}</td>
                      <td className={styles.nameCell}>{b.tenDoUong}</td>
                      <td>{b.tenDanhMuc}</td>
                      <td className={styles.priceCell}>{formatPrice(b.giaBan)}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[statusInfo.className]}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.editBtn}
                            title="Chỉnh sửa"
                            onClick={() => setEditingBeverage(b)}
                          >
                            <FaEdit />
                          </button>
                          {b.trangThai !== 'NGUNG_KINH_DOANH' && (
                            <button
                              className={styles.deleteBtn}
                              title="Ngưng kinh doanh"
                              onClick={() => setDeletingBeverage(b)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            className={styles.pageBtn}
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            ‹
          </button>
          {getPageNumbers().map((p) => (
            <button
              key={p}
              className={`${styles.pageNum} ${p === safePage ? styles.pageNumActive : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            ›
          </button>
          <button
            className={styles.pageBtn}
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            End
          </button>
        </div>
      )}

      {/* Popups */}
      {showAddPopup && (
        <AddProductPopup
          categories={categories}
          onSuccess={handleAddSuccess}
          onClose={() => setShowAddPopup(false)}
        />
      )}
      {editingBeverage && (
        <EditProductPopup
          beverage={editingBeverage}
          categories={categories}
          onSuccess={handleUpdateSuccess}
          onClose={() => setEditingBeverage(null)}
        />
      )}
      {deletingBeverage && (
        <ConfirmDeletePopup
          beverage={deletingBeverage}
          onSuccess={handleDeleteSuccess}
          onClose={() => setDeletingBeverage(null)}
        />
      )}
    </section>
  );
}

export default ProductManagementPage;