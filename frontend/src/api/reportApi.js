import { apiClient } from './apiClient';

export const getRevenueReport = async (startDate, endDate) => {
  const endpoint = `/hoa-don/report?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
  return apiClient(endpoint, {
    method: 'GET',
  });
};
