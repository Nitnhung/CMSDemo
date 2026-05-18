import express from 'express';
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/subjectController.js';

const router = express.Router();

router.post('/', createSubject); // POST /api/subjects - Thêm môn học mới
router.get('/', getAllSubjects);    // Thêm dòng này
router.put('/:id', updateSubject); // Thêm dòng này
router.delete('/:id', deleteSubject);

export default router;