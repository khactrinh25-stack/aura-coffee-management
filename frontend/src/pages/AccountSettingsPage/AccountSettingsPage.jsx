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
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
    setCpMatKhauCu('')
    setCpMatKhauMoi('')
    setCpXacNhanMatKhauMoi('')
    setOtpCode('')
    setOtpSent(false)
    setOtpVerified(false)
    setOtpError('')
    setOtpSuccess('')
    setError('')
    setSuccess('')
  }

  const handleSendOtp = async () => {
    setOtpError('')
    setOtpSuccess('')
    setSendingOtp(true)

    try {
      const result = await apiClient('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({
          maNhanVien: nhanVien.maNhanVien,
        }),
      })
      setOtpSent(true)
      setOtpSuccess(result.message || 'Mã OTP đã được gửi đến email của bạn')
    } catch (err) {
      setOtpError(err.message || 'Không thể gửi mã OTP')
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOtpAndChangePassword = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setOtpError('')
    setOtpSuccess('')

    // Validate passwords
    if (cpMatKhauMoi !== cpXacNhanMatKhauMoi) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (cpMatKhauMoi.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    if (!otpVerified && otpCode.trim() === '') {
      setError('Vui lòng nhập mã OTP')
      return
    }

    setIsSubmitting(true)
    try {
      // Step 1: Verify OTP
      if (!otpVerified) {
        setVerifyingOtp(true)
        await apiClient('/auth/verify-otp', {
          method: 'POST',
          body: JSON.stringify({
            maNhanVien: nhanVien.maNhanVien,
            otpCode: otpCode.trim(),
          }),
        })
        setOtpVerified(true)
        setOtpSuccess('Xác thực OTP thành công! Đang đổi mật khẩu...')
      }

      // Step 2: Change password (now OTP is verified in backend)
      const result = await apiClient('/auth/change-password', {
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
      setVerifyingOtp(false)
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
  const emailDisplay = nhanVien?.email || 'Chưa có email'

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

        {/* Email - read only */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${styles.inputReadOnly}`}
            value={emailDisplay}
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

      {/* Change password modal with OTP */}
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

            {/* Step info */}
            <p className={styles.stepInfo}>
              Bước 1: Nhập mật khẩu mới và gửi OTP
            </p>

            <form onSubmit={handleVerifyOtpAndChangePassword} noValidate>
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

              {/* OTP section */}
              <div className={styles.otpSection}>
                {!otpSent ? (
                  <button
                    type="button"
                    className={styles.sendOtpButton}
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                  >
                    {sendingOtp ? 'Đang gửi OTP...' : 'Gửi mã OTP qua email'}
                  </button>
                ) : (
                  <>
                    <p className={styles.stepInfo}>
                      Bước 2: Nhập mã OTP đã gửi đến email của bạn
                    </p>
                    <div className={styles.otpInputGroup}>
                      <input
                        id="otpCode"
                        className={`${styles.input} ${styles.otpInput}`}
                        type="text"
                        placeholder="Nhập mã OTP (4 chữ số)"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        required
                        disabled={otpVerified}
                      />
                      <button
                        type="button"
                        className={styles.resendOtpButton}
                        onClick={handleSendOtp}
                        disabled={sendingOtp}
                      >
                        {sendingOtp ? '...' : 'Gửi lại'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {otpError ? (
                <p className={styles.error} role="alert">
                  {otpError}
                </p>
              ) : null}
              {otpSuccess ? (
                <p className={styles.success} role="status">
                  {otpSuccess}
                </p>
              ) : null}
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
                  Hủy
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting || !otpSent}
                >
                  {isSubmitting
                    ? 'Đang xử lý...'
                    : verifyingOtp
                      ? 'Đang xác thực OTP...'
                      : 'Xác nhận đổi mật khẩu'}
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