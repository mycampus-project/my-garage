import express from 'express';

import upload from '../helpers/multerUpload';
import {
  createThing,
  findThingById,
  updateThing,
  findAllThings,
  deleteThing,
  restoreThing,
} from '../controllers/thingController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();
router.use(requireAuth());

router.get('/', findAllThings);
router.get('/:thingId', findThingById);
router.post('/', requireAuth('admin'), upload.single('image'), createThing);
router.put('/:thingId', requireAuth('admin'), upload.single('image'), updateThing);
router.delete('/:thingId', requireAuth('admin'), deleteThing);
router.put('/:thingId/restore', requireAuth('admin'), restoreThing);

export default router;
