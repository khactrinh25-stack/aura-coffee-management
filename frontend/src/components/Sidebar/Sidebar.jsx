import { NavLink, useNavigate } from 'react-router-dom'
import { clearNhanVienSession } from '../../utils/session'
import Icon from '../Icon'
import styles from './Sidebar.module.css'

function Sidebar({ brandTitle, menuItems, isOpen, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearNhanVienSession()
    onClose()
    navigate('/login', { replace: true })
  }

  const handleNavClick = () => {
    onClose()
  }

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <Icon name="box-broken" size={30} className={styles.brandIcon} />
          <p className={styles.brandTitle}>{brandTitle}</p>
        </div>

        <nav className={styles.nav} aria-label="Menu chính">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/pos' || item.path === '/admin/doanh-thu'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
              onClick={handleNavClick}
            >
              <Icon name="dashboard-outline" size={24} className={styles.navIcon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar