import { Router } from 'express';
import {
	getTeacher,
	getTeachers,
	createTeacher,
	updateTeacher,
	deleteTeacher,
} from '../controllers/teachers.controllers.js';

const router = Router();

router.get('/teachers', getTeachers);
router.get('/teachers/:id', getTeacher);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

export default router;
