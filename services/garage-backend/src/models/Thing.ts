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
  isAvailable: {
    type: Boolean,
    required: true,
  },
  removeAt: {
    type: Date,
  },
  removedBy: {
    type: String,
  },
});

export default mongoose.model('Thing', thingSchema);
