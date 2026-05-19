import client from '../client'

const classesApi = {
  getAll: () => client.get('/classes'),
  create: (data) => client.post('/classes', data),
  update: (id, data) => client.put(`/classes/${id}`, data),
  delete: (id) => client.delete(`/classes/${id}`)
}

export default classesApi

