import express from 'express';

import { requireAuth } from '../middlewares/auth';
import {
  getBookings,
  getBooking,
  postBooking,
  deleteBooking,
} from '../controllers/bookingController';

const router = express.Router();

router.use(requireAuth());

router.get('/', getBookings);
router.post('/', postBooking);
router.get('/:bookingId', getBooking);
router.delete('/:bookingId', deleteBooking);

export default router;
