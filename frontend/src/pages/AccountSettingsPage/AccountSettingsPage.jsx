import { useState } from 'react'
import { apiClient } from '../../api/apiClient'
import { getNhanVienSession } from '../../utils/session'
import styles from './AccountSettingsPage.module.css'

function AccountSettingsPage() {
  const nhanVien = getNhanVienSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [matKhauCu, setMatKhauCu] = useState('')
  const [matKhauMoi, setMatKhauMoi] = useState('')
  const [xacNhanMatKhauMoi, setXacNhanMatKhauMoi] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
    setMatKhauCu('')
    setMatKhauMoi('')
    setXacNhanMatKhauMoi('')
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (matKhauMoi !== xacNhanMatKhauMoi) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (matKhauMoi.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    setIsSubmitting(true)
    try {
      await apiClient('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({
          maNhanVien: nhanVien.maNhanVien,
          matKhauCu,
          matKhauMoi,
          xacNhanMatKhauMoi,
        }),
      })
      setSuccess('Đổi mật khẩu thành công')
      setMatKhauCu('')
      setMatKhauMoi('')
      setXacNhanMatKhauMoi('')
    } catch (err) {
      setError(err.message || 'Không thể đổi mật khẩu')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Cài đặt tài khoản</h1>
      <p className={styles.subtitle}>
        {nhanVien?.hoTen} — {nhanVien?.tenDangNhap} ({nhanVien?.vaiTro})
      </p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Bảo mật</h2>
        <button
          type="button"
          className={styles.changeButton}
          onClick={() => setIsModalOpen(true)}
        >
          Đổi mật khẩu
        </button>
      </div>

      {isModalOpen ? (
        <div className={styles.overlay} role="presentation" onClick={closeModal}>
          <div
            className={styles.modal}
            role="dialog"
            aria-labelledby="change-password-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="change-password-title" className={styles.modalTitle}>
              Đổi mật khẩu
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="matKhauCu">
                  Mật khẩu hiện tại
                </label>
                <input
                  id="matKhauCu"
                  className={styles.input}
                  type="password"
                  value={matKhauCu}
                  onChange={(e) => setMatKhauCu(e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="matKhauMoi">
                  Mật khẩu mới
                </label>
                <input
                  id="matKhauMoi"
                  className={styles.input}
                  type="password"
                  value={matKhauMoi}
                  onChange={(e) => setMatKhauMoi(e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="xacNhanMatKhauMoi">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  id="xacNhanMatKhauMoi"
                  className={styles.input}
                  type="password"
                  value={xacNhanMatKhauMoi}
                  onChange={(e) => setXacNhanMatKhauMoi(e.target.value)}
                  required
                />
              </div>

              {error ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p className={styles.success} role="status">
                  {success}
                </p>
              ) : null}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeModal}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  Lưu mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AccountSettingsPage
