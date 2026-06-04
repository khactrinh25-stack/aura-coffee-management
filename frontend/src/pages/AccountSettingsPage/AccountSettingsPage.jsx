import { useState } from 'react'
import { apiClient } from '../../api/apiClient'
import { getNhanVienSession } from '../../utils/session'
import styles from './AccountSettingsPage.module.css'

function AccountSettingsPage() {
  const nhanVien = getNhanVienSession()
  const [soDienThoai, setSoDienThoai] = useState(nhanVien?.soDienThoai || '')
  const [matKhauCu, setMatKhauCu] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Change password modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cpMatKhauCu, setCpMatKhauCu] = useState('')
  const [cpMatKhauMoi, setCpMatKhauMoi] = useState('')
  const [cpXacNhanMatKhauMoi, setCpXacNhanMatKhauMoi] = useState('')

  const closeModal = () => {
    setIsModalOpen(false)
    setCpMatKhauCu('')
    setCpMatKhauMoi('')
    setCpXacNhanMatKhauMoi('')
    setError('')
    setSuccess('')
  }

  const handleChangePassword = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (cpMatKhauMoi !== cpXacNhanMatKhauMoi) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (cpMatKhauMoi.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await apiClient('/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify({
          maNhanVien: nhanVien.maNhanVien,
          matKhauCu: cpMatKhauCu,
          matKhauMoi: cpMatKhauMoi,
          xacNhanMatKhauMoi: cpXacNhanMatKhauMoi,
        }),
      })
      setSuccess(result.message || 'Đổi mật khẩu thành công')
      closeModal()
    } catch (err) {
      setError(err.message || 'Không thể đổi mật khẩu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveChanges = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!matKhauCu.trim()) {
      setError('Vui lòng nhập mật khẩu hiện tại để xác nhận thay đổi')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await apiClient('/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify({
          maNhanVien: nhanVien.maNhanVien,
          matKhauCu: matKhauCu,
          soDienThoai: soDienThoai,
        }),
      })
      setSuccess(result.message || 'Cập nhật thông tin thành công')
      setMatKhauCu('')
    } catch (err) {
      setError(err.message || 'Không thể cập nhật thông tin')
    } finally {
      setIsSubmitting(false)
    }
  }

  const roleLabel = nhanVien?.vaiTro === 'Admin' ? 'Quản trị viên' : 'Nhân viên'

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Cài đặt tài khoản</h1>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Thông tin tài khoản</h2>

        {/* Full name - read only */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Họ tên</label>
          <input
            className={`${styles.input} ${styles.inputReadOnly}`}
            value={nhanVien?.hoTen || ''}
            readOnly
          />
        </div>

        {/* Phone number - editable */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Số điện thoại</label>
          <input
            className={styles.input}
            type="text"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
          />
        </div>

        {/* Role - read only */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Quyền hạn</label>
          <input
            className={`${styles.input} ${styles.inputReadOnly}`}
            value={roleLabel}
            readOnly
          />
        </div>

        {/* Current password field */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Mật khẩu hiện tại</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Nhập mật khẩu hiện tại để xác nhận thay đổi"
            value={matKhauCu}
            onChange={(e) => setMatKhauCu(e.target.value)}
          />
        </div>

        {/* Change password button */}
        <button
          type="button"
          className={styles.changePasswordButton}
          onClick={() => setIsModalOpen(true)}
        >
          Đổi mật khẩu
        </button>

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

        {/* Save button */}
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSaveChanges}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>

      {/* Change password modal */}
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
            <form onSubmit={handleChangePassword} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cpMatKhauCu">
                  Mật khẩu hiện tại
                </label>
                <input
                  id="cpMatKhauCu"
                  className={styles.input}
                  type="password"
                  value={cpMatKhauCu}
                  onChange={(e) => setCpMatKhauCu(e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cpMatKhauMoi">
                  Mật khẩu mới
                </label>
                <input
                  id="cpMatKhauMoi"
                  className={styles.input}
                  type="password"
                  value={cpMatKhauMoi}
                  onChange={(e) => setCpMatKhauMoi(e.target.value)}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cpXacNhanMatKhauMoi">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  id="cpXacNhanMatKhauMoi"
                  className={styles.input}
                  type="password"
                  value={cpXacNhanMatKhauMoi}
                  onChange={(e) => setCpXacNhanMatKhauMoi(e.target.value)}
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