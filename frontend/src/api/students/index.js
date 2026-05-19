import client from '../client'

const studentsApi = {
  getAll: () => client.get('/students'),
  getByClass: (classId) => client.get(`/students/${classId}`),
  create: (data) => client.post('/students', data),
  update: (id, data) => client.put(`/students/${id}`, data),
  delete: (id) => client.delete(`/students/${id}`)
}

export default studentsApi

