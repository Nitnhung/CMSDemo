import express from 'express';
import { getAllStudents, getStudentsByClass, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);              // GET /api/students - Lấy toàn bộ sinh viên
router.get('/:classId', getStudentsByClass);  // GET /api/students/:classId - Lấy sinh viên theo lớp
router.post('/', createStudent);             // POST /api/students - Thêm sinh viên mới
router.put('/:id', updateStudent);    // Thêm dòng này
router.delete('/:id', deleteStudent);

export default router;