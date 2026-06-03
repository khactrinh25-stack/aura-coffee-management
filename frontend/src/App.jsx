import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import AccountSettingsPage from './pages/AccountSettingsPage/AccountSettingsPage'
import InvoiceListPage from './pages/InvoiceListPage/InvoiceListPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RevenuePage from './pages/RevenuePage/RevenuePage'
import SalesManagementPage from './pages/SalesManagementPage/SalesManagementPage'
import ProductManagementPage from './pages/ProductManagementPage/ProductManagementPage'
import CustomerManagementPage from './pages/CustomerManagementPage/CustomerManagementPage'
import EmployeeManagementPage from './pages/EmployeeManagementPage/EmployeeManagementPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Employee pages WITH sidebar overlay */}
        <Route
          path="/pos"
          element={
            <ProtectedRoute allowedRoles={['NhanVien']}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SalesManagementPage />} />
          <Route path="don-hang" element={<InvoiceListPage />} />
          <Route path="cai-dat" element={<AccountSettingsPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/doanh-thu" replace />} />
          <Route path="doanh-thu" element={<RevenuePage />} />
          <Route path="do-uong" element={<ProductManagementPage />} />
          <Route path="don-hang" element={<InvoiceListPage />} />
          <Route path="khach-hang" element={<CustomerManagementPage />} />
          <Route path="nhan-su" element={<EmployeeManagementPage />} />
          <Route path="cai-dat" element={<AccountSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
