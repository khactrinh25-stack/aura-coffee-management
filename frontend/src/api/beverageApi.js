import { apiClient } from './apiClient';

export const beverageApi = {
  getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.trangThai) query.append('trangThai', params.trangThai);
    if (params.maDanhMuc) query.append('maDanhMuc', params.maDanhMuc);
    const qs = query.toString();
    return apiClient(`/api/do-uong${qs ? `?${qs}` : ''}`);
  },

  getByCode(maDoUongCode) {
    return apiClient(`/api/do-uong/${maDoUongCode}`);
  },

  create(data) {
    return apiClient('/api/do-uong', { method: 'POST', body: JSON.stringify(data) });
  },

  update(maDoUongCode, data) {
    return apiClient(`/api/do-uong/${maDoUongCode}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  softDelete(maDoUongCode) {
    return apiClient(`/api/do-uong/${maDoUongCode}`, { method: 'DELETE' });
  },
};
