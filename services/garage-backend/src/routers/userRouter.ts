import express from 'express';

import {
  findAllUsers,
  findUserByid,
  updateUser,
  removeUser,
  restoreUser,
} from '../controllers/userController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();
router.use(requireAuth());

router.get('/', requireAuth('admin'), findAllUsers);
router.get('/:userId', requireAuth('admin'), findUserByid);
router.put('/:userId', requireAuth('admin'), updateUser);
router.delete('/:userId', requireAuth('admin'), removeUser);
router.put('/:userId/restore', requireAuth('admin'), restoreUser);

export default router;
