import { useEffect, useMemo, useState } from 'react'
import { apiClient } from '../../api/apiClient'
import { formatVND } from '../../utils/cartUtils'
import { getNhanVienSession } from '../../utils/session'
import InvoiceDetailPopup from './InvoiceDetailPopup'
import styles from './InvoiceListPage.module.css'

const PAYMENT_METHODS = [
  { value: '', label: 'Tất cả phương thức' },
  { value: 'TIEN_MAT', label: 'Tiền mặt' },
  { value: 'CHUYEN_KHOAN', label: 'Chuyển khoản' },
]

const PAYMENT_LABELS = {
  TIEN_MAT: 'Tiền mặt',
  CHUYEN_KHOAN: 'Chuyển khoản',
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

const getTodayString = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function InvoiceListPage() {
  const [invoices, setInvoices] = useState([])
  const [filterMethod, setFilterMethod] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const session = getNhanVienSession()
  const isAdmin = session?.vaiTro === 'Admin'

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()
        if (filterMethod) params.append('phuongThucThanhToan', filterMethod)
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const query = params.toString() ? `?${params.toString()}` : ''
        const data = await apiClient(`/hoa-don${query}`)
        setInvoices(data)
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách hóa đơn. Vui lòng thử lại.')
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [filterMethod, startDate, endDate])

  const sortedInvoices = useMemo(
    () => [...invoices].sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)),
    [invoices]
  )

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Quản lý lưu trữ hóa đơn</h1>

      {isAdmin && (
        <div className={styles.searchPanel}>
          <div className={styles.dateFilterGroup}>
            <div className={styles.dateInputWrapper}>
              <label className={styles.dateLabel}>Từ ngày</label>
              <input
                type="date"
                className={styles.dateInput}
                value={startDate}
                max={getTodayString()}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  if (endDate && e.target.value > endDate) {
                    setEndDate(e.target.value)
                  }
                }}
              />
            </div>
            <div className={styles.dateInputWrapper}>
              <label className={styles.dateLabel}>Đến ngày</label>
              <input
                type="date"
                className={styles.dateInput}
                value={endDate}
                min={startDate || undefined}
                max={getTodayString()}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  if (startDate && e.target.value < startDate) {
                    setStartDate(e.target.value)
                  }
                }}
              />
            </div>
            {(startDate || endDate || filterMethod) && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => {
                  setStartDate('')
                  setEndDate('')
                  setFilterMethod('')
                }}
              >
                Xoá bộ lọc
              </button>
            )}
          </div>

          <select
            className={styles.filterSelect}
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            {PAYMENT_METHODS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.listContainer}>
        <div className={styles.listHeaderRow}>
          <span>Mã hóa đơn</span>
          <span>Thời gian tạo</span>
          <span>Tổng thanh toán</span>
          <span>Phương thức</span>
          <span>Thao tác</span>
        </div>

        {loading ? (
          <div className={styles.emptyState}>Đang tải hóa đơn...</div>
        ) : sortedInvoices.length === 0 ? (
          <div className={styles.emptyState}>Không có hóa đơn để hiển thị.</div>
        ) : (
          sortedInvoices.map((invoice) => (
            <div key={invoice.maHoaDon} className={styles.listRow}>
              <span className={styles.rowValue}>{invoice.maHoaDon}</span>
              <span className={styles.rowValue}>{formatDateTime(invoice.ngayTao)}</span>
              <span className={styles.rowValue}>{formatVND(invoice.tongTien)}</span>
              <span className={styles.rowValue}>{PAYMENT_LABELS[invoice.phuongThucThanhToan] || invoice.phuongThucThanhToan}</span>
              <button
                type="button"
                className={styles.viewButton}
                onClick={() => setSelectedInvoice(invoice)}
              >
                👁
              </button>
            </div>
          ))
        )}
      </div>

      {selectedInvoice && (
        <InvoiceDetailPopup invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  )
}

export default InvoiceListPage