import { Router } from 'express';
import {
  register,
  verifyEmailController,
  login,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmailController);
router.post('/login', login);

export default router;
