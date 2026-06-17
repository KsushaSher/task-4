import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkBlockedMiddleware } from '../middleware/checkBlockedMiddleware';
import {
  blockUsers,
  deleteUnverifiedUsers,
  deleteUsers,
  getUsers,
  unblockUsers,
} from '../controllers/userController';

const router = Router();

router.use(authMiddleware);
router.use(checkBlockedMiddleware);
router.get('/', getUsers);
router.post('/block', blockUsers);
router.post('/unblock', unblockUsers);
router.delete('/', deleteUsers);
router.delete('/unverified', deleteUnverifiedUsers);

export default router;
