import styles from './CustomerPopups.module.css';

function CustomerNotFoundPopup({ phoneNumber, onSkip, onRegister }) {
  return (
    <div className={styles.overlay} onClick={onSkip}>
      <div className={styles.notFoundModal} onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className={styles.notFoundIcon}>
          <svg
            className={styles.notFoundIconSvg}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <h2 className={styles.notFoundTitle}>Không tìm thấy khách hàng</h2>
        <p className={styles.notFoundDesc}>
          Số điện thoại <strong>{phoneNumber}</strong> vừa nhập chưa tồn tại
          trong hệ thống. Bạn có muốn đăng ký khách hàng mới không?
        </p>

        <div className={styles.notFoundActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onSkip}
          >
            Bỏ qua
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onRegister}
          >
            Đăng ký mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerNotFoundPopup;