import { useState } from 'react';
import { employeeApi } from '../../../api/employeeApi';
import popupStyles from './EmployeePopup.module.css';

function ResetPasswordPopup({ employee, onSuccess, onClose }) {
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matKhauMoi.trim()) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }
    if (matKhauMoi !== xacNhanMatKhau) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await employeeApi.resetPassword(employee.maNhanVien, matKhauMoi);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi cấp lại mật khẩu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={popupStyles.overlay} onClick={onClose}>
      <div className={popupStyles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={popupStyles.closeBtn} onClick={onClose}>×</button>
        <h2 className={popupStyles.title}>Cấp lại mật khẩu</h2>

        <form className={popupStyles.form} onSubmit={handleSubmit}>
          <div className={popupStyles.field}>
            <label>Nhân viên</label>
            <input type="text" value={employee.hoTen} disabled />
          </div>

          <div className={popupStyles.field}>
            <label>Mật khẩu mới</label>
            <input
              type="password"
              value={matKhauMoi}
              onChange={(e) => setMatKhauMoi(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div className={popupStyles.field}>
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={xacNhanMatKhau}
              onChange={(e) => setXacNhanMatKhau(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>

          {error && <div className={popupStyles.error}>{error}</div>}

          <div className={popupStyles.buttons}>
            <button type="button" className={popupStyles.cancelBtn} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={popupStyles.submitBtn} disabled={submitting}>
              {submitting ? 'Đang xử lý...' : 'Xác nhận'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPopup;