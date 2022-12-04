import { Router } from 'express';
import { getSubjects } from '../controllers/subjects.controllers.js';

const router = Router();

export default router.get('/subjects', getSubjects);
