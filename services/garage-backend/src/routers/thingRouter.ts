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

router.get('/', requireAuth('User'), findAllThings);
router.get('/:thingId', requireAuth('User'), findThingById);
router.post('/', requireAuth('Admin'), createThing);
router.put('/:thingId', requireAuth('Admin'), updateThing);
router.delete('/:thingId', requireAuth('Admin'), deleteThing);

export default router;
