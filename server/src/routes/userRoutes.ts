import express from 'express';
import { register, login, getProfile, getEmbedToken } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.get('/embed-token', auth, getEmbedToken);

export default router; 