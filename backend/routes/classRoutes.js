import express from 'express';
import { getAllClasses, createClass, updateClass, deleteClass } from '../controllers/classController.js';

const router = express.Router();

router.get('/', getAllClasses);   // GET /api/classes - Lấy danh sách lớp
router.post('/', createClass);   // POST /api/classes - Thêm lớp học mới
router.put('/:id', updateClass); 
router.delete('/:id', deleteClass); 

export default router;