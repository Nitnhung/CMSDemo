import axiosClient from '../axiosClient';

const ENDPOINT = '/student-subjects';

export default {
  // Lấy danh sách môn học của một sinh viên
  getByStudent: (studentId) => axiosClient.get(`${ENDPOINT}/${studentId}`),
  
  // Thêm môn học cho sinh viên
  addSubject: (studentId, subjectId) => axiosClient.post(`${ENDPOINT}/${studentId}/${subjectId}`),
  
  // Xóa môn học khỏi sinh viên
  removeSubject: (studentId, subjectId) => axiosClient.delete(`${ENDPOINT}/${studentId}/${subjectId}`),
};