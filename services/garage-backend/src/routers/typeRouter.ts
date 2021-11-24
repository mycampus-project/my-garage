import express from 'express';

import {
  createType,
  findAllTypes,
  findTypeById,
  updateType,
  deleteType,
  restoreType,
} from '../controllers/typeController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();
router.use(requireAuth());

router.get('/', findAllTypes);
router.get('/:typeId', requireAuth('admin'), findTypeById);
router.post('/', requireAuth('admin'), createType);
router.put('/:typeId', requireAuth('admin'), updateType);
router.delete('/:typeId', requireAuth('admin'), deleteType);
router.put('/:typeId/restore', requireAuth('admin'), restoreType);

export default router;
