import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Icon from '../components/Icon'
import { getNhanVienSession } from '../utils/session'
import { EMPLOYEE_MENU } from '../config/navigation'
import styles from './AppShellLayout.module.css'

function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const nhanVien = getNhanVienSession()
  const tenNhanVien = nhanVien?.hoTen || 'Nhân viên'

  return (
    <div className={styles.shell}>
      <Sidebar
        brandTitle="Aura Employee"
        menuItems={EMPLOYEE_MENU}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header className={styles.header}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setSidebarOpen(true)}
          aria-label="Mở menu"
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>

        <div className={styles.headerRight}>
          <span className={styles.userName}>{tenNhanVien}</span>
          <Icon name="user-outline" size={32} className={styles.userIcon} />
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default EmployeeLayout
