import { useState, useEffect } from 'react';
import { apiClient } from '../../../../api/apiClient';
import { formatVND } from '../../../../utils/cartUtils';
import styles from './ProductArea.module.css';

function ProductArea({ onSelectProduct }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        setError(null);
        const [catData, prodData] = await Promise.all([
          apiClient('/danh-muc'),
          apiClient('/do-uong?trangThai=HOAT_DONG'),
        ]);
        if (cancelled) return;
        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra kết nối máy chủ và làm mới trang.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.maDanhMuc === activeCategory)
    : products;

  const handleCategoryClick = (maDanhMuc) => {
    setActiveCategory((prev) => (prev === maDanhMuc ? null : maDanhMuc));
  };

  if (loading) {
    return (
      <div className={styles.productArea}>
        <p className={styles.loading}>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productArea}>
        <div className={styles.errorContainer}>
          <p className={styles.errorIcon}>⚠️</p>
          <p className={styles.errorMessage}>{error}</p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            Làm mới trang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productArea}>
      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        <button
          type="button"
          className={`${styles.categoryBtn} ${activeCategory === null ? styles.categoryBtnActive : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat.maDanhMuc}
            type="button"
            className={`${styles.categoryBtn} ${activeCategory === cat.maDanhMuc ? styles.categoryBtnActive : ''}`}
            onClick={() => handleCategoryClick(cat.maDanhMuc)}
          >
            {cat.tenDanhMuc}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.length === 0 && (
          <p className={styles.emptyText}>Không có sản phẩm nào.</p>
        )}
        {filteredProducts.map((product) => (
          <button
            key={product.maDoUong}
            type="button"
            className={styles.productCard}
            onClick={() => onSelectProduct(product)}
          >
            <div className={styles.productImage}>
              <span className={styles.productImagePlaceholder}>
                {product.tenDoUong?.charAt(0) || '?'}
              </span>
            </div>
            <p className={styles.productName}>{product.tenDoUong}</p>
            <p className={styles.productCategory}>
              {categories.find((c) => c.maDanhMuc === product.maDanhMuc)
                ?.tenDanhMuc || ''}
            </p>
            <p className={styles.productPrice}>
              {formatVND(product.giaBan)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductArea;
