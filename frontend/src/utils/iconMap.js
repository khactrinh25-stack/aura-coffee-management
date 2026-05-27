// Bản đồ ánh xạ icon từ Figma sang tên component react-icons
// Icon đã có file SVG trong thư mục public/icons
export const SVG_ICONS = {
  menu: '/icons/menu.svg',
  'user-outline': '/icons/user-outline.svg',
  'customer-group': '/icons/customer-group.svg',
  trash: '/icons/trash.svg',
  'close-rounded': '/icons/close-rounded.svg',
  'dropdown-arrow': '/icons/dropdown-arrow.svg',
  'box-broken': '/icons/box-broken.svg',
  'dashboard-outline': '/icons/dashboard-outline.svg',
  print: '/icons/print.svg',
  'print-outline': '/icons/print-outline.svg',
};

// Icon cần dùng react-icons (Material Symbols / Lucide)
// Các icon này chưa có file SVG riêng, sẽ dùng từ thư viện
export const REACT_ICON_MAP = {
  eye: 'eye',           // mdi:eye
  check: 'check',       // Check mark    
  close: 'x',           // close/x icon
  plus: 'plus',         // Plus
  search: 'search',     // Search
  addCircle: 'plusCircle', // add_circle
  lock: 'lock',         // Lock
  key: 'key',           // Key
  penTool: 'penTool',   // Pen tool
  xClose: 'x',          // X close
  star: 'star',         // Star
  eyeView: 'eye',       // mdi:eye
};