import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

export default {
  getAll: () => axiosClient.get(ENDPOINTS.CLASSES),
  create: (data) => axiosClient.post(ENDPOINTS.CLASSES, data),
  update: (id, data) => axiosClient.put(`${ENDPOINTS.CLASSES}/${id}`, data),
  delete: (id) => axiosClient.delete(`${ENDPOINTS.CLASSES}/${id}`),
};