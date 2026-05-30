import { useState } from 'react';
import { beverageApi } from '../../../api/beverageApi';
import styles from './ProductPopup.module.css';

function AddProductPopup({ categories, onSuccess, onClose }) {
  const [form, setForm] = useState({
    maDoUongCode: '',
    tenDoUong: '',
    giaBan: '',
    maDanhMuc: '',
    trangThai: 'CON_HANG',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.maDoUongCode.trim()) {
      setError('Vui lòng nhập mã đồ uống');
      return;
    }
    if (!form.tenDoUong.trim()) {
      setError('Vui lòng nhập tên đồ uống');
      return;
    }
    if (!form.giaBan || parseInt(form.giaBan, 10) <= 0) {
      setError('Giá bán phải là số nguyên dương');
      return;
    }
    if (!form.maDanhMuc) {
      setError('Vui lòng chọn danh mục');
      return;
    }

    setSubmitting(true);
    try {
      await beverageApi.create({
        maDoUongCode: form.maDoUongCode.trim(),
        tenDoUong: form.tenDoUong.trim(),
        giaBan: parseInt(form.giaBan, 10),
        maDanhMuc: parseInt(form.maDanhMuc, 10),
        trangThai: form.trangThai,
      });
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi thêm đồ uống';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Thêm đồ uống mới</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.formError}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label}>
              Mã đồ uống <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="maDoUongCode"
              className={styles.input}
              placeholder="VD: CF001"
              value={form.maDoUongCode}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Tên đồ uống <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="tenDoUong"
              className={styles.input}
              placeholder="VD: Cà phê sữa đá"
              value={form.tenDoUong}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Giá bán (₫) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="giaBan"
              className={styles.input}
              placeholder="0"
              min="1"
              value={form.giaBan}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Danh mục <span className={styles.required}>*</span>
            </label>
            <select
              name="maDanhMuc"
              className={styles.input}
              value={form.maDanhMuc}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Trạng thái</label>
            <select
              name="trangThai"
              className={styles.input}
              value={form.trangThai}
              onChange={handleChange}
            >
              <option value="CON_HANG">Còn hàng</option>
              <option value="HET_HANG">Hết hàng</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPopup;