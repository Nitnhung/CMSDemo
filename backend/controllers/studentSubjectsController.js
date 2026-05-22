import { getCollection, save } from '../utils/jsonStore.js';

// GET /api/student-subjects/:studentId — môn đang học của một sinh viên
export const getSubjectsByStudent = async (req, res) => {
  // Kiểm tra cả 'studentId' và 'id' để khớp với định nghĩa trong Routes
  const studentId = Number(req.params.studentId || req.params.id);
  
  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: 'studentId không hợp lệ' });
  }

  const links = getCollection('student_subjects');
  const subjects = getCollection('subjects');

  // Ép kiểu Number khi so sánh để tránh lỗi String vs Number trong file JSON
  const studentSubIds = links
    .filter(l => Number(l.studentId) === studentId)
    .map(l => Number(l.subjectId));
  
  // Lấy thông tin môn học đầy đủ
  const result = subjects.filter(s => studentSubIds.includes(Number(s.id)));
  
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
  // Ép kiểu Number khi so sánh để tránh lỗi lệch kiểu String/Number
  const isExist = links.some(l => 
    Number(l.studentId) === studentId && 
    Number(l.subjectId) === subjectId
  );
  
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
  const idx = links.findIndex(l => 
    Number(l.studentId) === studentId && 
    Number(l.subjectId) === subjectId
  );
  
  if (idx === -1) {
    return res.status(404).json({ message: 'Không tìm thấy bản ghi liên kết' });
  }

  links.splice(idx, 1);
  save('student_subjects');
  
  return res.json({ message: 'Đã gỡ môn khỏi sinh viên' });
};
