import mongoose, { Document, ObjectId } from 'mongoose';
import { Thing } from '@my-garage/common';

export interface ThingDocument extends Document, Omit<Thing, 'createdBy' | 'removedBy'> {
  createdBy: ObjectId;
  removedBy: ObjectId;
}

const thingSchema = new mongoose.Schema<ThingDocument>({
  name: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  removedAt: {
    type: Date,
    required: true,
  },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Thing', thingSchema);
