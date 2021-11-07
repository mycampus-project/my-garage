import mongoose, { Document, ObjectId } from 'mongoose';
import { Booking } from '@my-garage/common';

export interface BookingDocument extends Document<ObjectId>, Omit<Booking, 'thingId' | 'userId'> {
  userId: ObjectId;
  thingId: ObjectId;
  removedBy: ObjectId;
}

const bookingSchema = new mongoose.Schema<BookingDocument>({
  thingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thing',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
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
    default: () => new Date(),
  },
  removedAt: {
    type: Date,
    required: false,
  },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Booking', bookingSchema);
