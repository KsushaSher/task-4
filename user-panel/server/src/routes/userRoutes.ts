import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkBlockedMiddleware } from '../middleware/checkBlockedMiddleware';
import {
  getUsers,
  // blockUsers,
  // unblockUsers,
} from '../controllers/userController';

const router = Router();

router.use(authMiddleware);
router.use(checkBlockedMiddleware);
router.get('/', getUsers);
// router.post('/block', blockUsers);
// router.post('/unblock', unblockUsers);
// router.get('/', authMiddleware, checkBlockedMiddleware, getUsers);

export default router;
