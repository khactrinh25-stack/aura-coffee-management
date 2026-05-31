import { apiClient } from './apiClient';

export const danhMucApi = {
  getAll() {
    return apiClient('/danh-muc');
  },
};
