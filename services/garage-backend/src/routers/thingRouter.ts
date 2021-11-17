import express from 'express';

import { requireAuth } from '../middlewares/auth';
import {
  createThing,
  findThingById,
  updateThing,
  findAllThings,
  deleteThing,
} from '../controllers/thingController';

const router = express.Router();
router.use(requireAuth());

router.get('/', findAllThings);
router.get('/:thingId', findThingById);
router.post('/', requireAuth('admin'), createThing);
router.put('/:thingId', requireAuth('admin'), updateThing);
router.delete('/:thingId', requireAuth('admin'), deleteThing);

export default router;
