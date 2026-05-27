import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import styles from './CheckoutPopups.module.css';

/**
 * Cấu hình tài khoản ngân hàng cho demo.
 * Khi triển khai thật, lấy từ biến môi trường hoặc cấu hình backend.
 */
const BANK_CODE = 'Vietcombank';
const ACCOUNT_NUMBER = '9901415623';
const ACCOUNT_NAME = 'NGUYEN KHAC TRINH';

/**
 * Tính CRC-16/CCITT-FALSE cho chuỗi dữ liệu NAPAS.
 */
function crc16(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function buildTLV(tag, value) {
  const len = value.length.toString().padStart(2, '0');
  return tag + len + value;
}

/**
 * Tạo payload chuẩn EMVCo/NAPAS cho QR chuyển khoản ngân hàng.
 */
function generateNapasPayload(amount, content) {
  const safeAmount = (typeof amount === 'number' && !Number.isNaN(amount)) ? amount : 0;

  const guid = 'A000000775';
  const merchantId = ACCOUNT_NUMBER;
  const merchantInfo = buildTLV('00', guid) + buildTLV('01', merchantId);
  const merchantAccountInfo = buildTLV('38', merchantInfo);

  const additionalData = buildTLV('08', content || 'Thanh toan Aura Coffee');
  const additionalDataTemplate = buildTLV('62', additionalData);

  let payload = '';
  payload += buildTLV('00', '01');
  payload += buildTLV('01', '11');
  payload += merchantAccountInfo;
  payload += buildTLV('52', '0000');
  payload += buildTLV('53', '704');
  payload += buildTLV('54', safeAmount.toFixed(0));
  payload += buildTLV('58', 'VN');
  payload += buildTLV('59', ACCOUNT_NAME.substring(0, 25));
  payload += buildTLV('60', 'HCM');
  payload += additionalDataTemplate;
  payload += '6304';

  payload += crc16(payload.slice(0, -2) + '04');

  return payload;
}

function QrPopup({ amount, invoiceCode, onCancel, onConfirm }) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const content = `Aura ${invoiceCode || ''}`.trim();
  const qrValue = generateNapasPayload(amount, content);

  // Render QR code onto canvas via useEffect
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrValue, {
        width: 300,
        margin: 2,
        color: {
          dark: '#111827',
          light: '#ffffff',
        },
      }).catch((err) => {
        console.error('QR generation failed:', err);
      });
    }
  }, [qrValue]);

  const copyAccountInfo = () => {
    const info = `Ngân hàng: ${BANK_CODE}\nSố TK: ${ACCOUNT_NUMBER}\nChủ TK: ${ACCOUNT_NAME}\nSố tiền: ${(amount || 0).toLocaleString('vi-VN')}đ\nNội dung: ${content}`;
    navigator.clipboard.writeText(info).catch(() => {});
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.qrModal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.qrTitle}>Quét QR để thanh toán</h2>
        <p className={styles.qrAmount}>
          {(amount || 0).toLocaleString('vi-VN')}đ
        </p>

        <div className={styles.qrCode}>
          <canvas ref={canvasRef} width={300} height={300} />
        </div>

        {/* Thông tin tài khoản */}
        <div className={styles.qrBankInfo}>
          <div className={styles.qrBankRow}>
            <span className={styles.qrBankLabel}>Ngân hàng</span>
            <span className={styles.qrBankValue}>{BANK_CODE}</span>
          </div>
          <div className={styles.qrBankRow}>
            <span className={styles.qrBankLabel}>Số tài khoản</span>
            <span className={styles.qrBankValue}>{ACCOUNT_NUMBER}</span>
          </div>
          <div className={styles.qrBankRow}>
            <span className={styles.qrBankLabel}>Chủ tài khoản</span>
            <span className={styles.qrBankValue}>{ACCOUNT_NAME}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.qrCopyBtn}
          onClick={() => {
            setCopied(true);
            copyAccountInfo();
            setTimeout(() => setCopied(false), 2500);
          }}
        >
          {copied ? '✓ Đã sao chép' : 'Sao chép thông tin'}
        </button>

        <p className={styles.qrHint}>
          Mở ứng dụng ngân hàng hoặc ví điện tử, chọn "Quét QR" và quét mã
          phía trên để thanh toán.
        </p>

        <div className={styles.qrActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onConfirm}
          >
            Xác nhận giao dịch
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrPopup;