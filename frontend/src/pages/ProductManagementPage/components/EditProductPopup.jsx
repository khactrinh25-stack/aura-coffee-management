import { useState } from 'react';
import { beverageApi } from '../../../api/beverageApi';
import styles from './ProductPopup.module.css';

function EditProductPopup({ beverage, categories, onSuccess, onClose }) {
  const [form, setForm] = useState({
    tenDoUong: beverage.tenDoUong || '',
    giaBan: beverage.giaBan || '',
    maDanhMuc: beverage.maDanhMuc || '',
    trangThai: beverage.trangThai || 'CON_HANG',
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
      await beverageApi.update(beverage.maDoUongCode, {
        tenDoUong: form.tenDoUong.trim(),
        giaBan: parseInt(form.giaBan, 10),
        maDanhMuc: parseInt(form.maDanhMuc, 10),
        trangThai: form.trangThai,
      });
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi cập nhật';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chỉnh sửa đồ uống</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.formError}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label}>Mã đồ uống</label>
            <input
              type="text"
              className={styles.input}
              value={beverage.maDoUongCode || ''}
              disabled
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
              <option value="NGUNG_KINH_DOANH">Ngưng kinh doanh</option>
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

export default EditProductPopup;