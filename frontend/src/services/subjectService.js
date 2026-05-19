import subjectsApi from '../api/subjects'

export default {
  getAll: () => subjectsApi.getAll(),
  create: (data) => subjectsApi.create(data),
  // backend dùng route /api/subjects/:id (id số)
  update: (id, data) => subjectsApi.update(id, data),
  delete: (id) => subjectsApi.delete(id)
};
