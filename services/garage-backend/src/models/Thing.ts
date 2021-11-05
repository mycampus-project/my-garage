import mongoose, { Document } from 'mongoose';
import { Thing } from '@my-garage/common';

export type ThingDocument = Document & Thing;

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
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
});

export default mongoose.model('Thing', thingSchema);
