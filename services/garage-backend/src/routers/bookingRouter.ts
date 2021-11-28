import express from 'express';

import { requireAuth } from '../middlewares/auth';
import { getBookings, getBooking, postBooking } from '../controllers/bookingController';

const router = express.Router();

router.use(requireAuth());

router.get('/', getBookings);
router.post('/', postBooking);
router.get('/:bookingId', getBooking);

export default router;
