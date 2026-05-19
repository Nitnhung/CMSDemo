import classesApi from '../api/classes'

export default {
  getAll: () => classesApi.getAll(),
  create: (data) => classesApi.create(data),
  update: (id, data) => classesApi.update(id, data),
  delete: (id) => classesApi.delete(id)
};
