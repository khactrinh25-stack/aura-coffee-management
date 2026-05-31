import { apiClient } from './apiClient';

export const danhMucApi = {
  getAll() {
    return apiClient('/api/danh-muc');
  },
};
