import {
	login,
	register,
	user,
	logout,
} from '../controllers/admin.controllers.js';
import { Router } from 'express';

const router = Router();

// Routes
router.post('/login', login);
router.post('/register', register);
router.get('/user', user);
router.post('/logout', logout);

export default router;
