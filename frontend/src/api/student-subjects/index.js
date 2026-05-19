import client from '../client'

const studentSubjectsApi = {
  getByStudent: (studentId) => client.get(`/student-subjects/${studentId}`),
  addForStudent: (studentId, subjectId) => client.post(`/student-subjects/${studentId}/${subjectId}`),
  removeForStudent: (studentId, subjectId) => client.delete(`/student-subjects/${studentId}/${subjectId}`)
}

export default studentSubjectsApi

