import { useState } from 'react';
import { apiClient } from '../../../../api/apiClient';
import styles from './CustomerPopups.module.css';

function NewCustomerPopup({ defaultPhone, onCancel, onSuccess, onClose }) {
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState(defaultPhone || '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!hoTen.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }

    if (!soDienThoai.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    setSubmitting(true);
    try {
      const newCustomer = await apiClient('/khach-hang', {
        method: 'POST',
        body: JSON.stringify({
          hoTen: hoTen.trim(),
          soDienThoai: soDienThoai.trim(),
        }),
      });
      onSuccess(newCustomer);
      onClose();
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.registerModal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.registerTitle}>Đăng ký khách hàng mới</h2>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Họ tên</label>
            <input
              className={styles.fieldInput}
              type="text"
              placeholder="Nhập họ tên"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Số điện thoại</label>
            <input
              className={styles.fieldInput}
              type="text"
              placeholder="Nhập số điện thoại"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.registerActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onCancel || onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={submitting}
            >
              {submitting ? 'Đang lưu...' : 'Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCustomerPopup;