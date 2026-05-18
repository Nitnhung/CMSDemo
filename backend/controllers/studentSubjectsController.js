import { getCollection, save } from '../utils/jsonStore.js';

// GET /api/student-subjects/:studentId — môn đang học của một sinh viên
export const getSubjectsByStudent = async (req, res) => {
  const studentId = Number(req.params.studentId);
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: 'studentId không hợp lệ' });
  }

  const links = getCollection('student_subjects');
  const subjects = getCollection('subjects');

  // Lọc ra danh sách subjectId mà sinh viên này đang học
  const studentSubIds = links.filter(l => l.studentId === studentId).map(l => l.subjectId);
  
  // Ánh xạ id sang dữ liệu môn học đầy đủ
  const result = subjects.filter(s => studentSubIds.includes(s.id));
  
  return res.json(result);
};

export const addSubjectForStudent = async (req, res) => {
  const studentId = Number(req.params.studentId);
  const subjectId = Number(req.params.subjectId);
  if (Number.isNaN(studentId) || Number.isNaN(subjectId)) {
    return res.status(400).json({ message: 'studentId hoặc subjectId không hợp lệ' });
  }

  const links = getCollection('student_subjects');
  
  // Kiểm tra xem đã tồn tại liên kết chưa (giống Unique Key trong DB)
  const isExist = links.some(l => l.studentId === studentId && l.subjectId === subjectId);
  
  if (isExist) {
    return res.status(200).json({ message: 'Sinh viên đã học môn này rồi', data: { studentId, subjectId } });
  }

  links.push({ studentId, subjectId });
  save('student_subjects');
  
  return res.status(201).json({ message: 'Đã thêm môn cho sinh viên', data: { studentId, subjectId } });
};

export const removeSubjectForStudent = async (req, res) => {
  const studentId = Number(req.params.studentId);
  const subjectId = Number(req.params.subjectId);
  if (Number.isNaN(studentId) || Number.isNaN(subjectId)) {
    return res.status(400).json({ message: 'studentId hoặc subjectId không hợp lệ' });
  }

  const links = getCollection('student_subjects');
  const idx = links.findIndex(l => l.studentId === studentId && l.subjectId === subjectId);
  
  if (idx === -1) {
    return res.status(404).json({ message: 'Không tìm thấy bản ghi liên kết' });
  }

  links.splice(idx, 1);
  save('student_subjects');
  
  return res.json({ message: 'Đã gỡ môn khỏi sinh viên' });
};
