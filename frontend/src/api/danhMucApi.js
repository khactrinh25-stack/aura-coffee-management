import apiClient from './apiClient';

export const danhMucApi = {
  getAll() {
    return apiClient.get('/api/danh-muc');
  },
};