import { apiClient } from './apiClient';

export const customerApi = {
  getAll() {
    return apiClient('/khach-hang');
  },

  create(data) {
    return apiClient('/khach-hang', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(maKhachHang, data) {
    return apiClient(`/khach-hang/${maKhachHang}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(maKhachHang) {
    return apiClient(`/khach-hang/${maKhachHang}`, {
      method: 'DELETE',
    });
  },
};
