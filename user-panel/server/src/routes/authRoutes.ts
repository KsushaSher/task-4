import { Router } from 'express';
import { register, verifyEmailController } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmailController);
// router.post('/login', loginController);

export default router;
