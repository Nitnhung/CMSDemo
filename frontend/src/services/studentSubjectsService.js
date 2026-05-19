import studentSubjectsApi from '../api/student-subjects'

const studentSubjectsService = {
  getByStudent: (studentId) => studentSubjectsApi.getByStudent(studentId),
  addForStudent: (studentId, subjectId) => studentSubjectsApi.addForStudent(studentId, subjectId),
  removeForStudent: (studentId, subjectId) => studentSubjectsApi.removeForStudent(studentId, subjectId)
}

export default studentSubjectsService


