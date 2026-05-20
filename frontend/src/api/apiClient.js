const BASE_URL = 'http://localhost:8080/api';

export const apiClient = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Lỗi kết nối máy chủ: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi gọi dữ liệu:', error);
    throw error;
  }
};