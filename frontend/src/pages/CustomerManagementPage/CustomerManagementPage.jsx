import { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaFilter, FaPlusCircle, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import { customerApi } from '../../api/customerApi';
import styles from './CustomerManagementPage.module.css';

const ITEMS_PER_PAGE = 6;

const emptyForm = {
  hoTen: '',
  soDienThoai: '',
  diemTichLuy: '0',
};

function getCustomerCode(maKhachHang) {
  return `KH${String(maKhachHang ?? '').padStart(3, '0')}`;
}

function CustomerFormModal({ customer, onClose, onSuccess }) {
  const isEditing = Boolean(customer);
  const [form, setForm] = useState(
    isEditing
      ? {
          hoTen: customer.hoTen || '',
          soDienThoai: customer.soDienThoai || '',
          diemTichLuy: String(customer.diemTichLuy ?? 0),
        }
      : emptyForm,
  );
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!form.hoTen.trim()) return 'Vui lòng nhập họ tên khách hàng';
    if (!form.soDienThoai.trim()) return 'Vui lòng nhập số điện thoại';
    if (!/^[0-9]{9,11}$/.test(form.soDienThoai.trim())) {
      return 'Số điện thoại phải gồm 9 đến 11 chữ số';
    }

    if (isEditing) {
      const diemTichLuy = Number.parseInt(form.diemTichLuy, 10);
      if (Number.isNaN(diemTichLuy) || diemTichLuy < 0) {
        return 'Điểm tích lũy phải là số không âm';
      }
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      hoTen: form.hoTen.trim(),
      soDienThoai: form.soDienThoai.trim(),
      diemTichLuy: isEditing ? Number.parseInt(form.diemTichLuy, 10) : 0,
    };

    setSubmitting(true);
    try {
      if (isEditing) {
        await customerApi.update(customer.maKhachHang, payload);
      } else {
        await customerApi.create(payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.message || 'Không thể lưu khách hàng');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Đóng">
          <FaTimes />
        </button>

        <h2 className={styles.modalTitle}>
          {isEditing ? 'Cập nhật thông tin khách hàng' : 'Thêm thông tin khách hàng'}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.formError}>{error}</div>}

          <label className={styles.field}>
            <span>Họ tên</span>
            <input
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              placeholder="Nhập họ tên"
            />
          </label>

          <label className={styles.field}>
            <span>Số điện thoại</span>
            <input
              name="soDienThoai"
              value={form.soDienThoai}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
          </label>

          {isEditing && (
            <label className={styles.field}>
              <span>Điểm tích lũy</span>
              <input
                type="number"
                min="0"
                name="diemTichLuy"
                value={form.diemTichLuy}
                onChange={handleChange}
                placeholder="Nhập điểm tích lũy"
              />
            </label>
          )}

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={styles.modalPrimaryButton} disabled={submitting}>
              {submitting ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ customer, onClose, onSuccess }) {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    setError(null);

    try {
      await customerApi.delete(customer.maKhachHang);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Không thể xóa khách hàng');
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.confirmModal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Đóng">
          <FaTimes />
        </button>

        <h2 className={styles.modalTitle}>Xóa khách hàng</h2>
        {error && <div className={styles.formError}>{error}</div>}
        <p className={styles.confirmText}>
          Bạn có chắc muốn xóa khách hàng <strong>{customer.hoTen}</strong>?
        </p>

        <div className={styles.modalActions}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Hủy
          </button>
          <button type="button" className={styles.dangerButton} onClick={handleDelete} disabled={submitting}>
            {submitting ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomerManagementPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const fetchCustomers = () => {
    setLoading(true);
    setError(null);

    customerApi.getAll()
      .then((data) => {
        setCustomers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message || 'Không thể tải danh sách khách hàng');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return customers;

    return customers.filter((customer) => {
      const phone = String(customer.soDienThoai || '').toLowerCase();
      const name = String(customer.hoTen || '').toLowerCase();
      return phone.includes(term) || name.includes(term);
    });
  }, [customers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleMutationSuccess = () => {
    setShowAddModal(false);
    setEditingCustomer(null);
    setDeletingCustomer(null);
    fetchCustomers();
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }
    return pages;
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Quản lý khách hàng</h1>

        <div className={styles.toolbar}>
          <label className={styles.searchBox}>
            <input
              className={styles.searchInput}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm tên hoặc số điện thoại..."
            />
            <FaSearch className={styles.searchIcon} />
          </label>

          <button type="button" className={styles.filterButton}>
            <span>Bộ lọc</span>
            <FaFilter />
          </button>

          <button
            type="button"
            className={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlusCircle />
            <span>Thêm khách hàng mới</span>
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button type="button" onClick={fetchCustomers}>Tải lại</button>
        </div>
      )}

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>Đang tải dữ liệu...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Điểm tích lũy</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td className={styles.emptyRow} colSpan={5}>Không tìm thấy khách hàng nào.</td>
                </tr>
              ) : (
                pageItems.map((customer) => (
                  <tr key={customer.maKhachHang}>
                    <td className={styles.codeCell}>{getCustomerCode(customer.maKhachHang)}</td>
                    <td className={styles.nameText}>{customer.hoTen}</td>
                    <td className={styles.phoneCell}>{customer.soDienThoai}</td>
                    <td className={styles.pointsCell}>{customer.diemTichLuy ?? 0}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          type="button"
                          className={styles.editButton}
                          onClick={() => setEditingCustomer(customer)}
                          aria-label={`Sửa thông tin ${customer.hoTen}`}
                          title="Sửa thông tin"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() => setDeletingCustomer(customer)}
                          aria-label={`Xóa khách hàng ${customer.hoTen}`}
                          title="Xóa khách hàng"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

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
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            ‹
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`${styles.pageNum} ${page === safePage ? styles.pageNumActive : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
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

      {showAddModal && (
        <CustomerFormModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleMutationSuccess}
        />
      )}

      {editingCustomer && (
        <CustomerFormModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSuccess={handleMutationSuccess}
        />
      )}

      {deletingCustomer && (
        <DeleteConfirmModal
          customer={deletingCustomer}
          onClose={() => setDeletingCustomer(null)}
          onSuccess={handleMutationSuccess}
        />
      )}
    </section>
  );
}

export default CustomerManagementPage;
