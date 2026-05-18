import api from './api';

export default {
  getAll: () => api.get('/students'),
  getByClass: (classId) => api.get(`/students/${classId}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`)
};