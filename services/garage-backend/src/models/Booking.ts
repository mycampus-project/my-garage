import mongoose, { Document, Types } from 'mongoose';
import { Booking } from '@my-garage/common';

export interface BookingDocument
  extends Document<Types.ObjectId>,
    Omit<Booking, 'id' | 'thing' | 'user'> {
  user: Types.ObjectId;
  thing: Types.ObjectId;
  removedBy: Types.ObjectId;
}

const bookingSchema = new mongoose.Schema<BookingDocument>({
  thing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thing',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
    index: true,
  },
  endAt: {
    type: Date,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

export default mongoose.model('Booking', bookingSchema);
