import { formatVND } from '../../../../utils/cartUtils';
import styles from './CheckoutPopups.module.css';

function ReceiptPopup({ invoice, onDone }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '--/--/---- --:--';
    const d = new Date(dateStr);
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.overlay} onClick={onDone}>
      <div className={styles.receiptModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.receiptBrand}>AURA COFFEE</div>
        <h2 className={styles.receiptTitle}>HÓA ĐƠN THANH TOÁN</h2>
        <hr className={styles.receiptDivider} />

        <div className={styles.receiptInfo}>
          <div className={styles.receiptInfoRow}>
            <span className={styles.receiptInfoLabel}>Số HD:</span>
            <span className={styles.receiptInfoValue}>
              {invoice?.maHoaDon || '---'}
            </span>
          </div>
          <div className={styles.receiptInfoRow}>
            <span className={styles.receiptInfoLabel}>Ngày:</span>
            <span className={styles.receiptInfoValue}>
              {formatDate(invoice?.ngayTao)}
            </span>
          </div>
          <div className={styles.receiptInfoRow}>
            <span className={styles.receiptInfoLabel}>Thu ngân:</span>
            <span className={styles.receiptInfoValue}>
              {invoice?.tenNhanVien || '---'}
            </span>
          </div>
        </div>

        <hr className={styles.receiptDivider} />

        <div className={styles.receiptItems}>
          {invoice?.chiTietList?.map((item, idx) => (
            <div key={idx} className={styles.receiptItem}>
              <span className={styles.receiptItemName}>
                {item.tenDoUong || item.maDoUong}
              </span>
              <span className={styles.receiptItemQty}>x{item.soLuong}</span>
              <span className={styles.receiptItemPrice}>
                {formatVND(item.thanhTien)}
              </span>
            </div>
          ))}
        </div>

        <hr className={styles.receiptDivider} />

        <div className={styles.receiptTotalRow}>
          <span className={styles.receiptTotalLabel}>Tổng thanh toán</span>
          <span className={styles.receiptTotalValue}>
            {formatVND(invoice?.tongTien || 0)}
          </span>
        </div>

        <div className={styles.receiptAction}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onDone}
            style={{ width: '100%' }}
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPopup;