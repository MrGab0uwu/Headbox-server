import { Router } from 'express';
import { getCareers } from '../controllers/careers.controllers.js';

const router = Router();

export default router.get('/careers', getCareers);
