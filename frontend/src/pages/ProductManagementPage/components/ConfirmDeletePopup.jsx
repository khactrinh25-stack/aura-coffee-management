import { useState } from 'react';
import { beverageApi } from '../../../api/beverageApi';
import styles from './ProductPopup.module.css';

function ConfirmDeletePopup({ beverage, onSuccess, onClose }) {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await beverageApi.softDelete(beverage.maDoUongCode);
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Có lỗi xảy ra';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Xác nhận ngưng kinh doanh</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.confirmBody}>
          {error && <div className={styles.formError}>{error}</div>}
          <p className={styles.confirmText}>
            Bạn có chắc chắn muốn ngưng kinh doanh đồ uống{' '}
            <strong>{beverage.tenDoUong}</strong> (mã: {beverage.maDoUongCode})?
          </p>
          <p className={styles.confirmNote}>
            Sau khi ngưng kinh doanh, đồ uống này sẽ không hiển thị trong danh sách bán hàng nữa.
          </p>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Hủy
            </button>
            <button
              type="button"
              className={`${styles.submitBtn} ${styles.deleteConfirmBtn}`}
              onClick={handleConfirm}
              disabled={submitting}
            >
              {submitting ? 'Đang xử lý...' : 'Xác nhận ngưng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;