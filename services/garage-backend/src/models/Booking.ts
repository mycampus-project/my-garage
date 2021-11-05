import mongoose, { Document } from 'mongoose';
import { Booking } from '@my-garage/common';

export type BookingDocument = Document & Booking;

const bookingSchema = new mongoose.Schema<BookingDocument>({
  thingId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thing',
    },
  ],
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  removedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Booking', bookingSchema);
