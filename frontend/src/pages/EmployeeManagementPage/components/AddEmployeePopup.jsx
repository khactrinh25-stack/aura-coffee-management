import { useState } from 'react';
import { employeeApi } from '../../../api/employeeApi';
import popupStyles from './EmployeePopup.module.css';

function AddEmployeePopup({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    matKhau: '',
    hoTen: '',
    soDienThoai: '',
    vaiTro: 'NhanVien',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenDangNhap.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }
    if (!formData.matKhau.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await employeeApi.create(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi thêm nhân viên');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={popupStyles.overlay} onClick={onClose}>
      <div className={popupStyles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={popupStyles.closeBtn} onClick={onClose}>×</button>
        <h2 className={popupStyles.title}>Thêm nhân viên mới</h2>

        <form className={popupStyles.form} onSubmit={handleSubmit}>
          <div className={popupStyles.field}>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="tenDangNhap"
              value={formData.tenDangNhap}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className={popupStyles.field}>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className={popupStyles.field}>
            <label>Họ tên</label>
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              placeholder="Nhập họ tên"
            />
          </div>

          <div className={popupStyles.field}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className={popupStyles.field}>
            <label>Vai trò</label>
            <select name="vaiTro" value={formData.vaiTro} onChange={handleChange}>
              <option value="NhanVien">Nhân viên</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {error && <div className={popupStyles.error}>{error}</div>}

          <div className={popupStyles.buttons}>
            <button type="button" className={popupStyles.cancelBtn} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={popupStyles.submitBtn} disabled={submitting}>
              {submitting ? 'Đang xử lý...' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeePopup;