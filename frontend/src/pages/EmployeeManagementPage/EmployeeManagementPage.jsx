import { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaKey, FaLock, FaUnlock, FaSearch } from 'react-icons/fa';
import { employeeApi } from '../../api/employeeApi';
import AddEmployeePopup from './components/AddEmployeePopup';
import EditEmployeePopup from './components/EditEmployeePopup';
import ResetPasswordPopup from './components/ResetPasswordPopup';
import LockAccountPopup from './components/LockAccountPopup';
import styles from './EmployeeManagementPage.module.css';

const ITEMS_PER_PAGE = 6;

function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVaiTro, setFilterVaiTro] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [resettingEmployee, setResettingEmployee] = useState(null);
  const [togglingEmployee, setTogglingEmployee] = useState(null);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    setError(null);
    employeeApi.getAll(searchTerm || undefined, filterVaiTro || undefined)
      .then((data) => {
        setEmployees(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Không thể tải danh sách nhân viên. Vui lòng thử lại.');
        setLoading(false);
      });
  }, [searchTerm, filterVaiTro]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Client-side search + filter
  const filtered = employees.filter((emp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (emp.tenDangNhap && emp.tenDangNhap.toLowerCase().includes(term)) ||
      (emp.hoTen && emp.hoTen.toLowerCase().includes(term)) ||
      (emp.soDienThoai && emp.soDienThoai.toLowerCase().includes(term))
    );
  }).filter((emp) => {
    if (!filterVaiTro) return true;
    return emp.vaiTro === filterVaiTro;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSuccess = () => {
    setShowAddPopup(false);
    setEditingEmployee(null);
    setResettingEmployee(null);
    setTogglingEmployee(null);
    fetchEmployees();
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
      <h1 className={styles.pageTitle}>Quản lý nhân sự</h1>

      {/* Toolbar */}
        <div className={styles.toolbar}>
          <label className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            <FaSearch className={styles.searchIcon} />
          </label>

        <select
          className={styles.filterSelect}
          value={filterVaiTro}
          onChange={(e) => { setFilterVaiTro(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Vai trò</option>
          <option value="Admin">Admin</option>
          <option value="NhanVien">Nhân viên</option>
        </select>

        <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>
          + Thêm nhân viên mới
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button className={styles.retryButton} onClick={fetchEmployees}>
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
                <th>Mã</th>
                <th>Tên đăng nhập</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyRow}>
                    Không tìm thấy nhân viên nào.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((emp) => (
                  <tr key={emp.maNhanVien}>
                    <td>{emp.maNhanVien}</td>
                    <td>{emp.tenDangNhap}</td>
                    <td className={styles.nameCell}>{emp.hoTen}</td>
                    <td>{emp.soDienThoai}</td>
                    <td>{emp.vaiTro === 'Admin' ? 'Admin' : 'Nhân viên'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${emp.trangThai ? styles.active : styles.inactive}`}>
                        {emp.trangThai ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.iconBtn}
                          title="Chỉnh sửa"
                          onClick={() => setEditingEmployee(emp)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={styles.iconBtn}
                          title="Cấp lại mật khẩu"
                          onClick={() => setResettingEmployee(emp)}
                        >
                          <FaKey />
                        </button>
                        <button
                          className={styles.iconBtn}
                          title={emp.trangThai ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          onClick={() => setTogglingEmployee(emp)}
                        >
                          {emp.trangThai ? <FaLock /> : <FaUnlock />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
        <AddEmployeePopup
          onSuccess={handleSuccess}
          onClose={() => setShowAddPopup(false)}
        />
      )}
      {editingEmployee && (
        <EditEmployeePopup
          employee={editingEmployee}
          onSuccess={handleSuccess}
          onClose={() => setEditingEmployee(null)}
        />
      )}
      {resettingEmployee && (
        <ResetPasswordPopup
          employee={resettingEmployee}
          onSuccess={handleSuccess}
          onClose={() => setResettingEmployee(null)}
        />
      )}
      {togglingEmployee && (
        <LockAccountPopup
          employee={togglingEmployee}
          onSuccess={handleSuccess}
          onClose={() => setTogglingEmployee(null)}
        />
      )}
    </section>
  );
}

export default EmployeeManagementPage;