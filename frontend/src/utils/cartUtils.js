/**
 * Tạo lineId duy nhất cho mỗi dòng giỏ hàng
 */
let _idCounter = 0;
export const generateLineId = () => `line_${Date.now()}_${++_idCounter}`;

/**
 * Phụ phí kích cỡ: S=0đ, M=+5.000đ, L=+8.000đ
 */
export const SIZE_SURCHARGE = {
  S: 0,
  M: 5000,
  L: 8000,
};

/**
 * Tính đơn giá đã gồm phụ phí size
 */
export const calcUnitPrice = (giaBan, kichCo) => {
  const surcharge = SIZE_SURCHARGE[kichCo] ?? 0;
  return giaBan + surcharge;
};

/**
 * Kiểm tra 4 tiêu chí gộp giỏ: maDoUong, kichCo, luongDuong, luongDa
 */
const matchesAllFour = (a, b) =>
  a.maDoUong === b.maDoUong &&
  a.kichCo === b.kichCo &&
  a.luongDuong === b.luongDuong &&
  a.luongDa === b.luongDa;

/**
 * Thêm sản phẩm vào giỏ. Gộp nếu trùng cả 4 tiêu chí.
 */
export const addToCart = (cart, newItem) => {
  const existingIndex = cart.findIndex((line) => matchesAllFour(line, newItem));

  if (existingIndex !== -1) {
    return cart.map((line, idx) =>
      idx === existingIndex
        ? {
            ...line,
            soLuong: line.soLuong + newItem.soLuong,
            thanhTien: (line.soLuong + newItem.soLuong) * line.donGia,
          }
        : line
    );
  }

  return [
    ...cart,
    {
      ...newItem,
      lineId: generateLineId(),
      thanhTien: newItem.donGia * newItem.soLuong,
    },
  ];
};

/**
 * Cập nhật số lượng của một dòng. Nếu <= 0 thì xoá dòng.
 */
export const updateQuantity = (cart, lineId, newSoLuong) => {
  if (newSoLuong <= 0) return cart.filter((line) => line.lineId !== lineId);
  return cart.map((line) =>
    line.lineId === lineId
      ? {
          ...line,
          soLuong: newSoLuong,
          thanhTien: newSoLuong * line.donGia,
        }
      : line
  );
};

/**
 * Tính tạm tính (tổng thanhTien các dòng)
 */
export const calcSubtotal = (cart) =>
  cart.reduce((sum, line) => sum + line.thanhTien, 0);

/**
 * Tính số điểm tích được: 1.000đ = 1 điểm
 */
export const calcEarnedPoints = (subtotal) => Math.floor(subtotal / 1000);

/**
 * Tính số tiền giảm khi dùng điểm: 1 điểm = 100đ
 */
export const calcDiscountFromPoints = (diemSuDung) => diemSuDung * 100;

/**
 * Tính tổng cộng sau giảm điểm
 */
export const calcTotal = (subtotal, diemSuDung) => {
  const giam = calcDiscountFromPoints(diemSuDung);
  const total = subtotal - giam;
  return total >= 0 ? total : 0;
};

/**
 * Xoá sạch giỏ
 */
export const clearCart = () => [];

/**
 * Format tiền VNĐ: 45.000đ
 */
export const formatVND = (amount) => {
  if (amount == null || isNaN(amount)) return '0đ';
  return amount.toLocaleString('vi-VN') + 'đ';
};

/**
 * Tạo đối tượng sản phẩm chuẩn để thêm vào giỏ
 */
export const createCartItem = ({
  maDoUong,
  tenDoUong,
  giaBan,
  kichCo = 'S',
  luongDuong = '100%',
  luongDa = '100%',
  soLuong = 1,
}) => ({
  maDoUong,
  tenDoUong,
  giaBan,
  kichCo,
  luongDuong,
  luongDa,
  soLuong,
  donGia: calcUnitPrice(giaBan, kichCo),
  thanhTien: 0,
});

/**
 * Tạo ghi_chu_thuoc_tinh JSON cho DB
 */
export const buildGhiChuThuocTinh = (kichCo, luongDuong, luongDa) =>
  JSON.stringify({ kichCo, luongDuong, luongDa });