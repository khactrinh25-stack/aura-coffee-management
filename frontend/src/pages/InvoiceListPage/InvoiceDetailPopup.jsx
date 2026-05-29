import styles from './InvoiceListPage.module.css'
import { formatVND } from '../../utils/cartUtils'

const PAYMENT_LABELS = {
  TIEN_MAT: 'Tiền mặt',
  CHUYEN_KHOAN: 'Chuyển khoản',
}

const parseAttributes = (ghiChu) => {
  try {
    const attrs = JSON.parse(ghiChu)
    return [
      attrs.kichCo ? `Trà sữa ${attrs.kichCo}` : null,
      attrs.luongDuong ? `${attrs.luongDuong}` : null,
      attrs.luongDa ? `${attrs.luongDa}` : null,
    ]
      .filter(Boolean)
      .join(', ')
  } catch {
    return ''
  }
}

const formatDateTime = (value) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function InvoiceDetailPopup({ invoice, onClose }) {
  const notes = invoice.chiTietList
    ?.map((item) => parseAttributes(item.ghiChuThuocTinh))
    .filter(Boolean)
    .join('\n')

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.detailHeaderButton}>Chi Tiết Hóa đơn</div>
        <div className={styles.detailBody}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Mã hóa đơn:</span>
            <span>{invoice.maHoaDon}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Ngày xuất:</span>
            <span>{formatDateTime(invoice.ngayTao)}</span>
          </div>

          <div className={styles.detailSectionTitle}>Chi tiết sản phẩm:</div>
          <div className={styles.popupTableWrapper}>
            <table className={styles.popupTable}>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Đơn Giá</th>
                  <th>Thành Tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoice.chiTietList?.map((item) => (
                  <tr key={item.maChiTiet}>
                    <td>{item.tenDoUong}</td>
                    <td>{item.soLuong}</td>
                    <td>{formatVND(item.donGia)}</td>
                    <td>{formatVND(item.thanhTien)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.totalRow}>
            <span>Tổng tiền</span>
            <span>{formatVND(invoice.tongTien)}</span>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteLabel}>Ghi Chú:</div>
            <pre className={styles.noteText}>{notes || 'Không có ghi chú'}</pre>
          </div>

          <div className={styles.detailFooter}>
            <button type="button" className={styles.printButton} onClick={() => window.print()}>
              <span className={styles.printIcon}>🖨️</span>
              In lại
            </button>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailPopup
