import { apiClient } from './apiClient';

export const beverageApi = {
  getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.trangThai) query.append('trangThai', params.trangThai);
    if (params.maDanhMuc) query.append('maDanhMuc', params.maDanhMuc);
    const qs = query.toString();
    return apiClient(`/do-uong${qs ? `?${qs}` : ''}`);
  },

  getByCode(maDoUongCode) {
    return apiClient(`/do-uong/${maDoUongCode}`);
  },

  create(data) {
    return apiClient('/do-uong', { method: 'POST', body: JSON.stringify(data) });
  },

  update(maDoUongCode, data) {
    return apiClient(`/do-uong/${maDoUongCode}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  softDelete(maDoUongCode) {
    return apiClient(`/do-uong/${maDoUongCode}`, { method: 'DELETE' });
  },
};
