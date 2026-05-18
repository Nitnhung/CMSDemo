import api from './api';

export default {
  getAll: () => api.get('/subjects'),
  create: (data) => api.post('/subjects', data),
  // backend dùng route /api/subjects/:id (id số)
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`)
};
