import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import AccountSettingsPage from './pages/AccountSettingsPage/AccountSettingsPage'
import InvoiceListPage from './pages/InvoiceListPage/InvoiceListPage'
import LoginPage from './pages/LoginPage/LoginPage'
import PagePlaceholder from './components/PagePlaceholder/PagePlaceholder'
import RevenuePage from './pages/RevenuePage/RevenuePage'
import SalesManagementPage from './pages/SalesManagementPage/SalesManagementPage'

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
          <Route path="don-hang" element={<InvoiceListPage scope="employee" />} />
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
          <Route
            path="san-pham"
            element={
              <PagePlaceholder
                title="Quản lý sản phẩm"
                description="Triển khai theo PRODUCT_GUIDELINES.md."
              />
            }
          />
          <Route path="don-hang" element={<InvoiceListPage scope="admin" />} />
          <Route
            path="khach-hang"
            element={
              <PagePlaceholder
                title="Quản lý khách hàng"
                description="Triển khai theo CUSTOMER_GUIDELINES.md."
              />
            }
          />
          <Route
            path="nhan-su"
            element={
              <PagePlaceholder
                title="Quản lý nhân sự"
                description="Triển khai theo EMPLOYEE_GUIDELINES.md."
              />
            }
          />
          <Route path="cai-dat" element={<AccountSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App