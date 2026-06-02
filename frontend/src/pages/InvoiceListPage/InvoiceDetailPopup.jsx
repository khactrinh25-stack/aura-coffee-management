import styles from './InvoiceListPage.module.css'
import { formatVND } from '../../utils/cartUtils'

const formatAttributes = (ghiChu) => {
  try {
    const attrs = JSON.parse(ghiChu)
    const parts = []
    if (attrs.kichCo) parts.push(attrs.kichCo)
    if (attrs.luongDuong) parts.push(`Đường ${attrs.luongDuong}`)
    if (attrs.luongDa) parts.push(`Đá ${attrs.luongDa}`)
    return parts.join(' · ')
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
                {invoice.chiTietList?.map((item) => {
                  const attrNote = formatAttributes(item.ghiChuThuocTinh)
                  return (
                    <tr key={item.maChiTiet}>
                      <td>
                        <span className={styles.itemName}>{item.tenDoUong}</span>
                        {attrNote && (
                          <span className={styles.itemNote}>{attrNote}</span>
                        )}
                      </td>
                      <td>{item.soLuong}</td>
                      <td>{formatVND(item.donGia)}</td>
                      <td>{formatVND(item.thanhTien)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.totalRow}>
            <span>Tổng tiền</span>
            <span>{formatVND(invoice.tongTien)}</span>
          </div>

          <div className={styles.detailFooter}>
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
