import { useState, useEffect, useRef } from 'react';
import { apiClient } from '../../../../api/apiClient';
import Icon from '../../../../components/Icon';
import {
  calcSubtotal,
  calcEarnedPoints,
  calcDiscountFromPoints,
  calcTotal,
  formatVND,
} from '../../../../utils/cartUtils';
import styles from './CartArea.module.css';

function CartArea({
  cart,
  onUpdateQuantity,
  onClearCart,
  onPay,
  onFoundCustomer,
  customerPopupActive = false,
}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customer, setCustomer] = useState(null);
  const [pointMode, setPointMode] = useState('earn'); // 'earn' | 'use'
  const [diemSuDung, setDiemSuDung] = useState(0);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  const subtotal = calcSubtotal(cart);
  const isCartEmpty = cart.length === 0;

  // Reset customer + point mode when cart becomes empty
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isCartEmpty) {
      setCustomer(null);
      setPhoneNumber('');
      setPointMode('earn');
      setDiemSuDung(0);
      setError('');
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [isCartEmpty]);

  // Debounced phone lookup - only trigger when exactly 10 digits
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const cleaned = phoneNumber.trim();
    // Only search when exactly 10 digits are entered (Vietnamese phone number)
    if (cleaned.length !== 10) {
      setCustomer(null);
      setPointMode('earn');
      setDiemSuDung(0);
      return;
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    debounceRef.current = setTimeout(() => {
      apiClient(
        `/khach-hang?soDienThoai=${encodeURIComponent(cleaned)}`
      ).then((data) => {
        if (data) {
          setCustomer(data);
          onFoundCustomer(data);
          setError('');
          // Reset point mode for new customer
          setPointMode(data.diemTichLuy > 0 ? 'earn' : 'earn');
          setDiemSuDung(0);
        } else {
          // Phone not found -> will trigger NotFound popup from parent
          setCustomer(null);
          onFoundCustomer(null, cleaned);
        }
      }).catch(() => {
        setCustomer(null);
        onFoundCustomer(null, cleaned);
      });
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);
  // onFoundCustomer is stable callback from parent

  const handlePhoneChange = (value) => {
    // Only allow digits (0-9), max 10 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digitsOnly);
    setError('');
  };

  const handleTogglePointMode = () => {
    setPointMode((prev) => (prev === 'earn' ? 'use' : 'earn'));
    setDiemSuDung(0);
  };

  const handleDiemSuDungChange = (value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    if (customer && num > customer.diemTichLuy) {
      setError('Số điểm vượt quá điểm hiện có');
    } else {
      setError('');
    }
    setDiemSuDung(num);
  };

  const giamGia = pointMode === 'use' ? calcDiscountFromPoints(diemSuDung) : 0;
  const tongCong = calcTotal(subtotal, pointMode === 'use' ? diemSuDung : 0);
  const diemTichDuoc = calcEarnedPoints(subtotal);

  const canUsePoints = customer && customer.diemTichLuy > 0;
  const canPay =
    !isCartEmpty &&
    tongCong > 0 &&
    !error &&
    !(pointMode === 'use' && diemSuDung > 0 && (!customer || diemSuDung > customer.diemTichLuy));

  const handlePayClick = () => {
    if (!canPay) return;
    onPay({
      customer,
      pointMode,
      diemSuDung: pointMode === 'use' ? diemSuDung : 0,
      diemTichDuoc: pointMode === 'earn' ? diemTichDuoc : 0,
      subtotal,
      giamGia,
      tongCong,
    });
  };

  return (
    <div className={styles.cartArea}>
      <h2 className={styles.cartTitle}>Đơn hàng</h2>

      {/* Customer Phone Input */}
      <div className={styles.customerSection}>
        <input
          className={styles.phoneInput}
          type="text"
          placeholder="Nhập SĐT khách hàng..."
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          disabled={isCartEmpty || customerPopupActive}
        />
      </div>

      {/* Customer Info Card */}
          {customer && (
            <div className={styles.customerCard}>
              <div className={styles.customerInfo}>
                <Icon name="customer-group" size={14} />
                <p className={styles.customerName}>{customer.hoTen}</p>
              </div>
          <div className={styles.pointsBadge}>
            {customer.diemTichLuy} điểm
          </div>
        </div>
      )}

      {/* Point Toggle - Only show when customer exists */}
      {customer && (
        <div className={styles.pointToggleSection}>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              {pointMode === 'earn' ? 'Tích điểm' : 'Dùng điểm'}
            </span>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${pointMode === 'use' ? styles.toggleSwitchActive : ''}`}
              onClick={handleTogglePointMode}
              disabled={!canUsePoints && pointMode === 'earn'}
            >
              <span
                className={`${styles.toggleKnob} ${pointMode === 'use' ? styles.toggleKnobActive : ''}`}
              />
            </button>
          </div>

          {pointMode === 'earn' && (
            <p className={styles.earnPointsHint}>
              +{diemTichDuoc} điểm sẽ được tích
            </p>
          )}

          {pointMode === 'use' && (
            <div className={styles.pointInputRow}>
              <input
                className={styles.pointInput}
                type="number"
                min={0}
                max={customer.diemTichLuy}
                value={diemSuDung}
                onChange={(e) => handleDiemSuDungChange(e.target.value)}
                disabled={!canUsePoints}
              />
              <span className={styles.pointInputHint}>
                / {customer.diemTichLuy} điểm (giảm {formatVND(giamGia)})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Cart Items */}
      <div className={styles.cartItems}>
        {isCartEmpty && (
          <div className={styles.emptyCart}>Chưa có sản phẩm nào</div>
        )}
        {cart.map((item) => (
          <div key={item.lineId} className={styles.cartItem}>
            <div className={styles.itemHeader}>
              <p className={styles.itemName}>{item.tenDoUong}</p>
              <p className={styles.itemPrice}>{formatVND(item.thanhTien)}</p>
            </div>
            <p className={styles.itemUnitPrice}>
              {formatVND(item.donGia)} / ly
            </p>
            <div className={styles.quantityRow}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() =>
                  onUpdateQuantity(item.lineId, item.soLuong - 1)
                }
              >
                −
              </button>
              <span className={styles.qtyValue}>{item.soLuong}</span>
              <button
                type="button"
                className={`${styles.qtyBtn} ${styles.qtyBtnAdd}`}
                onClick={() =>
                  onUpdateQuantity(item.lineId, item.soLuong + 1)
                }
              >
                +
              </button>
            </div>
            <p className={styles.itemToppingHint}>
              {item.kichCo} · Đường {item.luongDuong} · Đá {item.luongDa}
            </p>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className={styles.priceSummary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Tạm tính</span>
          <span className={styles.summaryValue}>{formatVND(subtotal)}</span>
        </div>

        {giamGia > 0 && (
          <div className={styles.discountRow}>
            <span className={styles.discountLabel}>
              Giảm điểm ({diemSuDung} điểm)
            </span>
            <span className={styles.discountValue}>
              -{formatVND(giamGia)}
            </span>
          </div>
        )}

        <hr className={styles.dashedDivider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Tổng cộng</span>
          <span className={styles.totalValue}>{formatVND(tongCong)}</span>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.trashBtn}
                onClick={onClearCart}
                disabled={isCartEmpty}
                aria-label="Xóa giỏ hàng"
              >
                <Icon name="trash" size={24} />
              </button>
          <button
            type="button"
            className={styles.payBtn}
            onClick={handlePayClick}
            disabled={!canPay}
          >
            {isCartEmpty
              ? 'Thanh toán'
              : `Thanh toán ${formatVND(tongCong)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartArea;