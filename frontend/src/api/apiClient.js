import { getNhanVienSession } from '../utils/session';

const BASE_URL = 'http://localhost:8080/api';

export const apiClient = async (endpoint, options = {}) => {
  const nhanVien = getNhanVienSession();

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Attach JWT token if available
  if (nhanVien?.token) {
    defaultHeaders['Authorization'] = `Bearer ${nhanVien.token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  let data = null;

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const message =
      data?.message || `Lỗi kết nối máy chủ: ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};