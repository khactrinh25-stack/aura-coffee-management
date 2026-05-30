import apiClient from './apiClient';

export const beverageApi = {
  getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.trangThai) query.append('trangThai', params.trangThai);
    if (params.maDanhMuc) query.append('maDanhMuc', params.maDanhMuc);
    const qs = query.toString();
    return apiClient.get(`/api/do-uong${qs ? `?${qs}` : ''}`);
  },

  getByCode(maDoUongCode) {
    return apiClient.get(`/api/do-uong/${maDoUongCode}`);
  },

  create(data) {
    return apiClient.post('/api/do-uong', data);
  },

  update(maDoUongCode, data) {
    return apiClient.put(`/api/do-uong/${maDoUongCode}`, data);
  },

  softDelete(maDoUongCode) {
    return apiClient.delete(`/api/do-uong/${maDoUongCode}`);
  },
};