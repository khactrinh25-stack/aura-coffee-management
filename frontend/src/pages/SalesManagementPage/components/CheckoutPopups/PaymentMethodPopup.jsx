import styles from './CheckoutPopups.module.css';

function PaymentMethodPopup({ onCancel, onSelect }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.paymentModal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.paymentTitle}>Chọn phương thức thanh toán</h2>

        <select
          className={styles.paymentSelect}
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onSelect(e.target.value);
          }}
        >
          <option value="" disabled>
            Chọn phương thức
          </option>
          <option value="TIEN_MAT">Tiền mặt</option>
          <option value="CHUYEN_KHOAN">Chuyển khoản (QR)</option>
        </select>

        <div className={styles.paymentActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodPopup;