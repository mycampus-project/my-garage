import express from 'express';

import {
  createThing,
  findThingById,
  updateThing,
  findAllThings,
  deleteThing,
} from '../controllers/thingController';

const router = express.Router();

router.get('/', findAllThings);
router.get('/:thingId', findThingById);
router.post('/', createThing);
router.put('/:thingId', updateThing);
router.delete('/:thingId', deleteThing);

export default router;
