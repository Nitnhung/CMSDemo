import { getCollection, save, nextId } from '../utils/jsonStore.js';

export const getSubjectsList = () => {
  try {
    return getCollection('subjects');
  } catch (error) {
    throw new Error('Không thể lấy danh sách môn học từ JSON.');
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await getSubjectsList();
    return res.json(subjects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSubject = async (req, res) => {
  const { code, name, credits } = req.body;
  if (!code || !name || !credits) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ!' });

  const subjects = getCollection('subjects');
  
  // Kiểm tra mã môn học đã tồn tại chưa
  if (subjects.some(s => s.code.toLowerCase() === code.toLowerCase())) {
    return res.status(400).json({ message: 'Mã môn học đã tồn tại!' });
  }

  const id = nextId(subjects);
  const newSubject = { id, code, name, credits: Number(credits) };
  
  subjects.push(newSubject);
  save('subjects');
  
  return res.status(201).json({ message: 'Thêm môn học thành công!', data: newSubject });
};

export const updateSubject = async (req, res) => {
  const id = Number(req.params.id);
  const { code, name, credits } = req.body;
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID môn học không hợp lệ!' });
  if (!code || !name || !credits) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ!' });

  const subjects = getCollection('subjects');
  const target = subjects.find(s => s.id === id);
  
  if (!target) return res.status(404).json({ message: 'Không tìm thấy môn học để cập nhật!' });

  // Kiểm tra trùng mã với môn khác
  if (subjects.some(s => s.code.toLowerCase() === code.toLowerCase() && s.id !== id)) {
    return res.status(400).json({ message: 'Mã môn mới bị trùng với môn khác!' });
  }

  target.code = code;
  target.name = name;
  target.credits = Number(credits);
  save('subjects');

  return res.json({ message: 'Cập nhật môn học thành công!', data: target });
};

export const deleteSubject = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID môn học không hợp lệ!' });

  const subjects = getCollection('subjects');
  const idx = subjects.findIndex(s => s.id === id);
  
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy môn học để xóa!' });

  subjects.splice(idx, 1);
  save('subjects');
  
  return res.json({ message: 'Xóa môn học thành công!' });
};