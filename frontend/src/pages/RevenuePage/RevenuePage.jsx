import { useEffect, useMemo, useState } from 'react'
import { getRevenueReport } from '../../api/reportApi'
import { formatVND } from '../../utils/cartUtils'
import styles from './RevenuePage.module.css'

function getDefaultDate(daysAgo = 0) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

function isDateRangeValid(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return !Number.isNaN(start.valueOf()) && !Number.isNaN(end.valueOf()) && start <= end
}

function getDiffDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((end - start) / msPerDay) + 1
}

function RevenuePage() {
  const [startDate, setStartDate] = useState(getDefaultDate(6))
  const [endDate, setEndDate] = useState(getDefaultDate(0))
  const [report, setReport] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const maxRevenue = useMemo(
    () => report.reduce((max, item) => Math.max(max, item.revenue || 0), 0),
    [report]
  )

  const fetchReport = async (from, to) => {
    if (!isDateRangeValid(from, to)) {
      setError('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.')
      return
    }
    const rangeDays = getDiffDays(from, to)
    if (rangeDays > 365) {
      setError('Khoảng thời gian tối đa là 365 ngày.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const data = await getRevenueReport(from, to)
      setReport(data || [])
    } catch (err) {
      setReport([])
      setError(err.message || 'Không thể tải báo cáo doanh thu.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReport(startDate, endDate)
  }, [])

  const handleSearch = () => {
    fetchReport(startDate, endDate)
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Doanh thu</h1>
          <p className={styles.description}>
            Thống kê doanh thu theo ngày và số lượng hóa đơn. Hiển thị mặc định 7 ngày gần nhất.
          </p>
        </div>
      </div>

      <div className={styles.filterPanel}>
        <label className={styles.field}>
          <span>Ngày bắt đầu</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>Ngày kết thúc</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
        <button type="button" className={styles.searchButton} onClick={handleSearch}>
          Áp dụng
        </button>
      </div>

      {error ? (
        <div className={styles.errorBox}>
          <p>{error}</p>
        </div>
      ) : null}

      <div className={styles.reportGrid}>
        <div className={styles.summaryCard}>
          <p className={styles.cardLabel}>Tổng doanh thu</p>
          <p className={styles.cardValue}>{formatVND(report.reduce((sum, item) => sum + (item.revenue || 0), 0))}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.cardLabel}>Tổng số hóa đơn</p>
          <p className={styles.cardValue}>{report.reduce((sum, item) => sum + (item.invoiceCount || 0), 0)}</p>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.sectionTitle}>Biểu đồ doanh thu theo ngày</h2>
        {loading ? (
          <div className={styles.message}>Đang tải dữ liệu...</div>
        ) : report.length === 0 ? (
          <div className={styles.message}>Không có dữ liệu trong khoảng thời gian này.</div>
        ) : (
          <div className={styles.chartList}>
            {report.map((item) => {
              const width = maxRevenue ? Math.max(6, (item.revenue / maxRevenue) * 100) : 6
              return (
                <div key={item.date} className={styles.chartRow}>
                  <span className={styles.chartLabel}>{item.date}</span>
                  <div className={styles.chartBarWrapper}>
                    <div
                      className={styles.chartBar}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className={styles.chartValue}>{formatVND(item.revenue)}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={styles.tableCard}>
        <h2 className={styles.sectionTitle}>Số lượng hóa đơn theo ngày</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Số hóa đơn</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item) => (
                <tr key={item.date}>
                  <td>{item.date}</td>
                  <td>{item.invoiceCount}</td>
                  <td>{formatVND(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default RevenuePage
