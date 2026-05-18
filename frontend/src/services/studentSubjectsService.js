import api from './api'

const studentSubjectsService = {
  getByStudent: (studentId) => api.get(`/student-subjects/${studentId}`),
  addForStudent: (studentId, subjectId) => api.post(`/student-subjects/${studentId}/${subjectId}`),
  removeForStudent: (studentId, subjectId) => api.delete(`/student-subjects/${studentId}/${subjectId}`)
}

export default studentSubjectsService

