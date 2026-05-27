import React from 'react';
import { 
  FiEye, FiCheck, FiX, FiPlus, FiSearch, FiPlusCircle, 
  FiLock, FiKey, FiEdit3, FiStar, FiEyeOff 
} from 'react-icons/fi';
import { SVG_ICONS } from '../../utils/iconMap';

// Ánh xạ tên icon sang component react-icons
const REACT_ICON_MAP = {
  eye: FiEye,
  check: FiCheck,
  close: FiX,
  x: FiX,
  plus: FiPlus,
  search: FiSearch,
  addCircle: FiPlusCircle,
  lock: FiLock,
  key: FiKey,
  penTool: FiEdit3,
  star: FiStar,
  eyeView: FiEye,
  eyeOff: FiEyeOff,
};

/**
 * Component Icon thống nhất cho toàn bộ dự án
 * Hỗ trợ cả SVG từ public/icons và react-icons
 * 
 * @param {string} name - Tên icon (key trong iconMap hoặc react-icons)
 * @param {number|string} size - Kích thước icon (mặc định 24)
 * @param {string} className - Class CSS bổ sung
 * @param {string} color - Màu sắc (CSS color value)
 */
function Icon({ name, size = 24, className = '', color, ...rest }) {
  // Ưu tiên dùng SVG từ thư mục public
  if (SVG_ICONS[name]) {
    return (
      <img 
        src={SVG_ICONS[name]} 
        alt={name}
        width={size}
        height={size}
        className={className}
        style={{ color: color || undefined }}
        {...rest}
      />
    );
  }

  // Fallback sang react-icons
  const ReactIconComponent = REACT_ICON_MAP[name];
  if (ReactIconComponent) {
    return (
      <ReactIconComponent 
        size={size}
        className={className}
        color={color}
        {...rest}
      />
    );
  }

  // Fallback: hiển thị placeholder
  return (
    <span 
      style={{ width: size, height: size, display: 'inline-block' }}
      className={className}
      title={`Icon "${name}" not found`}
    />
  );
}

export default Icon;