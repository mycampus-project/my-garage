import mongoose, { Document, ObjectId } from 'mongoose';
import { Thing } from '@my-garage/common';

export interface ThingDocument
  extends Document<ObjectId>,
    Omit<Thing, 'createdBy' | 'removedBy' | 'id'> {
  createdBy: ObjectId;
  removedBy?: ObjectId;
}

const thingSchema = new mongoose.Schema<ThingDocument>({
  name: {
    type: String,
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
    default: () => new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  removedAt: {
    type: Date,
    required: false,
  },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    dataUrl: { type: String },
    required: false,
  },
});

export default mongoose.model('Thing', thingSchema);
