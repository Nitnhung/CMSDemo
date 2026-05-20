import axiosClient from '../axiosClient';
import { ENDPOINTS } from '../endpoints';

export default {
  getAll: () => axiosClient.get(ENDPOINTS.STUDENTS),
  getByClass: (classId) => axiosClient.get(`${ENDPOINTS.STUDENTS}/class/${classId}`),
  create: (data) => axiosClient.post(ENDPOINTS.STUDENTS, data),
  update: (id, data) => axiosClient.put(`${ENDPOINTS.STUDENTS}/${id}`, data),
  delete: (id) => axiosClient.delete(`${ENDPOINTS.STUDENTS}/${id}`),
};