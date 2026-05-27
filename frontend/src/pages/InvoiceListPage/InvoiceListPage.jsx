import PagePlaceholder from '../../components/PagePlaceholder/PagePlaceholder'

function InvoiceListPage({ scope }) {
  const isEmployee = scope === 'employee'

  return (
    <PagePlaceholder
      title="Quản lý đơn hàng"
      description={
        isEmployee
          ? 'Nhân viên chỉ xem hóa đơn do mình tạo trong ngày làm việc hôm nay (INVOICE_GUIDELINES.md).'
          : 'Admin xem toàn bộ lịch sử hóa đơn, lọc theo ngày và nhân viên.'
      }
    />
  )
}

export default InvoiceListPage
