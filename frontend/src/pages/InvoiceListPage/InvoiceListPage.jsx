import { useEffect, useMemo, useState } from 'react'
import { apiClient } from '../../api/apiClient'
import { formatVND } from '../../utils/cartUtils'
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

function InvoiceListPage() {
  const [invoices, setInvoices] = useState([])
  const [filterMethod, setFilterMethod] = useState('')
  const [searchCode, setSearchCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      setError('')

      try {
        const query = filterMethod ? `?phuongThucThanhToan=${encodeURIComponent(filterMethod)}` : ''
        const data = await apiClient(`/hoa-don${query}`)
        setInvoices(data)
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách hóa đơn. Vui lòng thử lại.')
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [filterMethod])

  const sortedInvoices = useMemo(
    () => [...invoices].sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)),
    [invoices]
  )

  const filteredInvoices = useMemo(() => {
    const normalizedSearch = searchCode.trim().toLowerCase()
    if (!normalizedSearch) return sortedInvoices

    return sortedInvoices.filter((invoice) =>
      invoice.maHoaDon?.toString().toLowerCase().includes(normalizedSearch)
    )
  }, [searchCode, sortedInvoices])

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Quản lý lưu trữ hóa đơn</h1>

      <div className={styles.searchPanel}>
        <div className={styles.searchInputGroup}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm mã hóa đơn..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={() => setSearchCode(searchCode.trim())}
          >
            Tìm kiếm
          </button>
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
        ) : filteredInvoices.length === 0 ? (
          <div className={styles.emptyState}>Không có hóa đơn để hiển thị.</div>
        ) : (
          filteredInvoices.map((invoice) => (
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
