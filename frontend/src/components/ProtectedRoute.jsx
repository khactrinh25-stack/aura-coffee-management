import { Navigate, useLocation } from 'react-router-dom'
import { getDefaultRouteForRole, getNhanVienSession } from '../utils/session'

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation()
  const nhanVien = getNhanVienSession()

  if (!nhanVien) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(nhanVien.vaiTro)) {
    return <Navigate to={getDefaultRouteForRole(nhanVien.vaiTro)} replace />
  }

  return children
}

export default ProtectedRoute
