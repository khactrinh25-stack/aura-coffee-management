import { useState } from 'react';
import {
  createCartItem,
  calcUnitPrice,
  formatVND,
} from '../../../../utils/cartUtils';
import styles from './CustomizationModal.module.css';

const SIZE_OPTIONS = ['S', 'M', 'L'];
const SUGAR_OPTIONS = ['50%', '75%', '100%'];
const ICE_OPTIONS = ['50%', '100%', 'Đá riêng'];

function CustomizationModal({ product, onAdd, onClose }) {
  const [kichCo, setKichCo] = useState('S');
  const [luongDuong, setLuongDuong] = useState('100%');
  const [luongDa, setLuongDa] = useState('100%');
  const [soLuong, setSoLuong] = useState(1);

  const unitPrice = calcUnitPrice(product.giaBan, kichCo);
  const totalPrice = unitPrice * soLuong;

  const handleAdd = () => {
    const newItem = createCartItem({
      maDoUong: product.maDoUong,
      tenDoUong: product.tenDoUong,
      giaBan: product.giaBan,
      kichCo,
      luongDuong,
      luongDa,
      soLuong,
    });
    onAdd(newItem);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Tùy chỉnh đồ uống</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <hr className={styles.divider} />

        {/* Drink Info + Quantity */}
        <div className={styles.drinkInfo}>
          <div className={styles.drinkDetails}>
            <p className={styles.drinkName}>{product.tenDoUong}</p>
            <p className={styles.drinkPrice}>{formatVND(product.giaBan)}</p>
          </div>
          <div className={styles.quantityControl}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setSoLuong((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className={styles.qtyValue}>{soLuong}</span>
            <button
              type="button"
              className={`${styles.qtyBtn} ${styles.qtyBtnAdd}`}
              onClick={() => setSoLuong((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Size */}
        <div>
          <p className={styles.optionLabel}>Chọn kích cỡ</p>
          <div className={styles.optionRow}>
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                className={`${styles.optionChip} ${kichCo === size ? styles.optionChipActive : ''}`}
                onClick={() => setKichCo(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sugar Level */}
        <div>
          <p className={styles.optionLabel}>Chọn mức đường</p>
          <div className={styles.optionRow}>
            {SUGAR_OPTIONS.map((sugar) => (
              <button
                key={sugar}
                type="button"
                className={`${styles.optionChip} ${luongDuong === sugar ? styles.optionChipActive : ''}`}
                onClick={() => setLuongDuong(sugar)}
              >
                {sugar}
              </button>
            ))}
          </div>
        </div>

        {/* Ice Level */}
        <div>
          <p className={styles.optionLabel}>Chọn mức đá</p>
          <div className={styles.optionRow}>
            {ICE_OPTIONS.map((ice) => (
              <button
                key={ice}
                type="button"
                className={`${styles.optionChip} ${luongDa === ice ? styles.optionChipActive : ''}`}
                onClick={() => setLuongDa(ice)}
              >
                {ice}
              </button>
            ))}
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Footer */}
        <div className={styles.footer}>
          <div>
            <p className={styles.totalLabel}>Tổng cộng</p>
            <p className={styles.totalPrice}>{formatVND(totalPrice)}</p>
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAdd}
          >
            Thêm vào đơn
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomizationModal;