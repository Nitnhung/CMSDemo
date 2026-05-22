import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

export default {
  getAll: () => axiosClient.get(ENDPOINTS.SUBJECTS),
  create: (data) => axiosClient.post(ENDPOINTS.SUBJECTS, data),
  update: (id, data) => axiosClient.put(`${ENDPOINTS.SUBJECTS}/${id}`, data),
  delete: (id) => axiosClient.delete(`${ENDPOINTS.SUBJECTS}/${id}`),
};