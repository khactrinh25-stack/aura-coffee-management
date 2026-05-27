import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../api/apiClient'
import {
  getDefaultRouteForRole,
  getNhanVienSession,
  saveNhanVienSession,
} from '../../utils/session'
import styles from './LoginPage.module.css'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const session = getNhanVienSession()
    if (session) {
      navigate(getDefaultRouteForRole(session.vaiTro), { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setPasswordError('')
    setSubmitError('')

    if (!username.trim()) {
      setSubmitError('Tên đăng nhập không được để trống')
      return
    }

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu')
      return
    }

    setIsSubmitting(true)
    try {
      const nhanVien = await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          tenDangNhap: username.trim(),
          matKhau: password,
        }),
      })
      saveNhanVienSession(nhanVien)
      navigate(getDefaultRouteForRole(nhanVien.vaiTro), { replace: true })
    } catch (error) {
      setSubmitError(
        error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.formCard} aria-labelledby="login-heading">
        <h1 id="login-heading" className="visually-hidden">
          Đăng nhập Aura Coffee
        </h1>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <img
            src="/images/brand-logo.png"
            alt="Aura Coffee Logo"
            className={styles.brandLogo}
          />

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="username">
              Tên đăng nhập
            </label>
            <input
              id="username"
              className={styles.input}
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                if (passwordError) setPasswordError('')
              }}
            />
            {passwordError ? (
              <p className={styles.error} role="alert">
                {passwordError}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <p className={styles.error} role="alert">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Đăng nhập
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage