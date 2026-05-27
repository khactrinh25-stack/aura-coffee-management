const SESSION_KEY = 'aura_nhan_vien'
const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000

export const saveNhanVienSession = (nhanVien) => {
  const payload = {
    ...nhanVien,
    loginAt: Date.now(),
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload))
}

export const getNhanVienSession = () => {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw)
    if (!session?.loginAt) {
      clearNhanVienSession()
      return null
    }

    if (Date.now() - session.loginAt > SESSION_MAX_AGE_MS) {
      clearNhanVienSession()
      return null
    }

    return session
  } catch {
    clearNhanVienSession()
    return null
  }
}

export const clearNhanVienSession = () => {
  sessionStorage.removeItem(SESSION_KEY)
}

export const getDefaultRouteForRole = (vaiTro) => {
  if (vaiTro === 'Admin') return '/admin/doanh-thu'
  return '/pos'
}
