import express from 'express';

import { requireAuth } from '../middlewares/auth';
import {
  getBookings,
  getBooking,
  postBooking,
  deleteBooking,
  putBooking,
} from '../controllers/bookingController';

const router = express.Router();

router.use(requireAuth());

router.get('/', getBookings);
router.post('/', postBooking);
router.get('/:bookingId', getBooking);
router.delete('/:bookingId', deleteBooking);
router.put('/:bookingId', putBooking);

export default router;
