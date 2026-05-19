import client from '../client'

const subjectsApi = {
  getAll: () => client.get('/subjects'),
  create: (data) => client.post('/subjects', data),
  update: (id, data) => client.put(`/subjects/${id}`, data),
  delete: (id) => client.delete(`/subjects/${id}`)
}

export default subjectsApi

