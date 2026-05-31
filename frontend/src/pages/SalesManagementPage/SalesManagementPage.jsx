import { useState, useCallback } from 'react';
import { getNhanVienSession } from '../../utils/session';
import { addToCart, updateQuantity, clearCart } from '../../utils/cartUtils';
import { apiClient } from '../../api/apiClient';

import ProductArea from './components/ProductArea/ProductArea';
import CartArea from './components/CartArea/CartArea';
import CustomizationModal from './components/CustomizationModal/CustomizationModal';
import CustomerNotFoundPopup from './components/CustomerPopups/CustomerNotFoundPopup';
import NewCustomerPopup from './components/CustomerPopups/NewCustomerPopup';
import PaymentMethodPopup from './components/CheckoutPopups/PaymentMethodPopup';
import QrPopup from './components/CheckoutPopups/QrPopup';
import ReceiptPopup from './components/CheckoutPopups/ReceiptPopup';

import styles from './SalesManagementPage.module.css';

function SalesManagementPage() {
  const nhanVien = getNhanVienSession();

  // === Core Cart State ===
  const [cart, setCart] = useState([]);

  // === Modal States ===
  const [customizationProduct, setCustomizationProduct] = useState(null);
  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);
  const [notFoundPhone, setNotFoundPhone] = useState('');
  const [showNewCustomerPopup, setShowNewCustomerPopup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastInvoice, setLastInvoice] = useState(null);
  const [payPayload, setPayPayload] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // === Cart Operations ===
  const handleAddToCart = useCallback(
    (newItem) => {
      setCart((prev) => addToCart(prev, newItem));
    },
    []
  );

  const handleUpdateQuantity = useCallback((lineId, newSoLuong) => {
    setCart((prev) => updateQuantity(prev, lineId, newSoLuong));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart(clearCart());
  }, []);

  // === Product Selection ===
  const handleSelectProduct = useCallback((product) => {
    setCustomizationProduct(product);
  }, []);

  // === Customer Search Callback ===
  // Called from CartArea when a phone is looked up
  // eslint-disable-next-line no-unused-vars
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const handleFoundCustomer = useCallback((customerData, phone) => {
    if (customerData) {
      setCurrentCustomer(customerData);
      setShowNotFoundPopup(false);
      setShowNewCustomerPopup(false);
    } else if (phone) {
      // Customer not found → show popup
      setCurrentCustomer(null);
      setNotFoundPhone(phone);
      setShowNotFoundPopup(true);
    }
  }, []);

  const handleSkipCustomer = () => {
    setShowNotFoundPopup(false);
    setCurrentCustomer(null);
  };

  const handleOpenRegisterFromNotFound = () => {
    setShowNotFoundPopup(false);
    setShowNewCustomerPopup(true);
  };

  const handleNewCustomerSuccess = (newCustomer) => {
    setCurrentCustomer(newCustomer);
    setShowNewCustomerPopup(false);
  };

  // === Payment Flow ===
  const handlePay = useCallback((payload) => {
    setPayPayload(payload);
    setSelectedPaymentMethod(null);
    setShowQrPopup(false);
    setSubmitError('');
    // Open payment method popup
    setSelectedPaymentMethod('pending'); // dummy to trigger PaymentMethodPopup
  }, []);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    if (method === 'CHUYEN_KHOAN') {
      setShowQrPopup(true);
    } else {
      // Cash payment → submit directly
      submitInvoice(method);
    }
  };

  const handlePaymentMethodCancel = () => {
    setSelectedPaymentMethod(null);
    setPayPayload(null);
  };

  const handleQrConfirm = () => {
    submitInvoice('CHUYEN_KHOAN');
    setShowQrPopup(false);
  };

  const handleQrCancel = () => {
    setShowQrPopup(false);
    setSelectedPaymentMethod(null);
    setPayPayload(null);
  };

  // === Submit Invoice API ===
  const submitInvoice = async (phuongThuc) => {
    if (!payPayload) return;
    setSubmitError('');

    const chiTietList = cart.map((item) => ({
      maDoUong: item.maDoUong,
      soLuong: item.soLuong,
      donGia: item.donGia,
      thanhTien: item.thanhTien,
      ghiChuThuocTinh: JSON.stringify({
        kichCo: item.kichCo,
        luongDuong: item.luongDuong,
        luongDa: item.luongDa,
      }),
    }));

    const body = {
      tongTien: payPayload.tongCong,
      phuongThucThanhToan: phuongThuc,
      maNhanVien: nhanVien?.maNhanVien,
      maKhachHang: payPayload.customer?.maKhachHang || null,
      diemSuDung: payPayload.diemSuDung || 0,
      diemCongThem: payPayload.diemTichDuoc || 0,
      chiTietList,
    };

    try {
      const invoice = await apiClient('/hoa-don', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setLastInvoice(invoice);
      setShowReceipt(true);
    } catch (err) {
      setSubmitError(err.message || 'Tạo hóa đơn thất bại. Vui lòng thử lại.');
    }
  };

  const handleReceiptDone = () => {
    setShowReceipt(false);
    setCart(clearCart());
    setCurrentCustomer(null);
    setPayPayload(null);
    setSelectedPaymentMethod(null);
    setSubmitError('');
  };

  // === Render ===
  return (
    <>
      {/* Main Content: Product Area + Cart Area */}
      <div className={styles.mainContent}>
        <div className={styles.productAreaWrapper}>
          <ProductArea onSelectProduct={handleSelectProduct} />
        </div>
        <div className={styles.cartAreaWrapper}>
          <CartArea
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onPay={handlePay}
            onFoundCustomer={handleFoundCustomer}
          />

          {/* Error from submit */}
          {submitError && (
            <p className={styles.submitError}>{submitError}</p>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {customizationProduct && (
        <CustomizationModal
          product={customizationProduct}
          onAdd={handleAddToCart}
          onClose={() => setCustomizationProduct(null)}
        />
      )}

      {/* Customer Not Found Popup */}
      {showNotFoundPopup && (
        <CustomerNotFoundPopup
          phoneNumber={notFoundPhone}
          onSkip={handleSkipCustomer}
          onRegister={handleOpenRegisterFromNotFound}
        />
      )}

      {/* New Customer Popup */}
      {showNewCustomerPopup && (
        <NewCustomerPopup
          defaultPhone={notFoundPhone}
          onCancel={() => setShowNewCustomerPopup(false)}
          onSuccess={handleNewCustomerSuccess}
          onClose={() => {
            setShowNewCustomerPopup(false);
            setCurrentCustomer(null);
          }}
        />
      )}

      {/* Payment Method Popup */}
      {selectedPaymentMethod === 'pending' && !showQrPopup && !showReceipt && (
        <PaymentMethodPopup
          onCancel={handlePaymentMethodCancel}
          onSelect={handlePaymentMethodSelect}
        />
      )}

      {/* QR Popup */}
      {showQrPopup && payPayload && (
        <QrPopup
          amount={payPayload.tongCong}
          onCancel={handleQrCancel}
          onConfirm={handleQrConfirm}
        />
      )}

      {/* Receipt Popup */}
      {showReceipt && lastInvoice && (
        <ReceiptPopup
          invoice={lastInvoice}
          onDone={handleReceiptDone}
        />
      )}
    </>
  );
}

export default SalesManagementPage;