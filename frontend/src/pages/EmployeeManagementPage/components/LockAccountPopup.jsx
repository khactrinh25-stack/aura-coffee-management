import { useState } from 'react';
import { employeeApi } from '../../../api/employeeApi';
import popupStyles from './EmployeePopup.module.css';

function LockAccountPopup({ employee, onSuccess, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isLocking = employee.trangThai; // If active, we are locking
  const actionLabel = isLocking ? 'khóa' : 'mở khóa';

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await employeeApi.toggleStatus(employee.maNhanVien);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={popupStyles.overlay} onClick={onClose}>
      <div className={`${popupStyles.popup} ${popupStyles.confirmPopup}`} onClick={(e) => e.stopPropagation()}>
        <button className={popupStyles.closeBtn} onClick={onClose}>×</button>
        <h2 className={popupStyles.title}>
          Xác nhận {actionLabel} tài khoản
        </h2>

        <p className={popupStyles.confirmText}>
          Bạn có chắc chắn muốn {actionLabel} tài khoản của nhân viên <strong>{employee.hoTen}</strong>?
        </p>

        <p className={popupStyles.warningText}>
          {isLocking
            ? 'Sau khi khóa, nhân viên sẽ không thể đăng nhập vào hệ thống.'
            : 'Sau khi mở khóa, nhân viên có thể đăng nhập lại vào hệ thống.'}
        </p>

        {error && <div className={popupStyles.error}>{error}</div>}

        <div className={popupStyles.buttons}>
          <button type="button" className={popupStyles.cancelBtn} onClick={onClose}>
            Hủy
          </button>
          <button
            type="button"
            className={`${popupStyles.submitBtn} ${isLocking ? popupStyles.dangerBtn : ''}`}
            disabled={submitting}
            onClick={handleConfirm}
          >
            {submitting ? 'Đang xử lý...' : (isLocking ? 'Khóa' : 'Mở khóa')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockAccountPopup;