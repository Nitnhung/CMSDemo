import studentsApi from '../api/students'

export default {
  getAll: () => studentsApi.getAll(),
  getByClass: (classId) => studentsApi.getByClass(classId),
  create: (data) => studentsApi.create(data),
  update: (id, data) => studentsApi.update(id, data),
  delete: (id) => studentsApi.delete(id)
};
