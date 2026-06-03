import { apiClient } from './apiClient';

export const employeeApi = {
  getAll(search, vaiTro) {
    const params = {};
    if (search) params.search = search;
    if (vaiTro) params.vaiTro = vaiTro;
    const query = new URLSearchParams(params).toString();
    return apiClient(`/nhan-vien${query ? '?' + query : ''}`);
  },

  getById(id) {
    return apiClient(`/nhan-vien/${id}`);
  },

  create(data) {
    return apiClient('/nhan-vien', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update(id, data) {
    return apiClient(`/nhan-vien/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  resetPassword(id, matKhauMoi) {
    return apiClient(`/nhan-vien/${id}/reset-password`, {
      method: 'PATCH',
      body: JSON.stringify({ matKhauMoi }),
    });
  },

  toggleStatus(id) {
    return apiClient(`/nhan-vien/${id}/toggle-status`, {
      method: 'PATCH',
    });
  },
};