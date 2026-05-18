import express from 'express';
import {
  getSubjectsByStudent,
  addSubjectForStudent,
  removeSubjectForStudent
} from '../controllers/studentSubjectsController.js';

const router = express.Router();

// GET /api/student-subjects/:studentId
router.get('/:studentId', getSubjectsByStudent);

// POST /api/student-subjects/:studentId/:subjectId
router.post('/:studentId/:subjectId', addSubjectForStudent);

// DELETE /api/student-subjects/:studentId/:subjectId
router.delete('/:studentId/:subjectId', removeSubjectForStudent);

export default router;

