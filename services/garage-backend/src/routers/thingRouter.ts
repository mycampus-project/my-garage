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
router.post('/', createThing);
router.put('/:thingId', updateThing);
router.delete('/:thingId', deleteThing);

export default router;
