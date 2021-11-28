import mongoose, { Document, Types } from 'mongoose';
import { Thing } from '@my-garage/common';

export interface ThingDocument
  extends Document<Types.ObjectId>,
    Omit<Thing, 'createdBy' | 'removedBy' | 'id' | 'type'> {
  createdBy: Types.ObjectId;
  removedBy?: Types.ObjectId;
  type: Types.ObjectId;
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
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
  imageUrl: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Thing', thingSchema);
