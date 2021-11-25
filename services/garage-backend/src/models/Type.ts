import mongoose, { Document, ObjectId } from 'mongoose';
import { Type } from '@my-garage/common';

export interface TypeDocument
  extends Document<ObjectId>,
    Omit<Type, 'createdBy' | 'removedBy' | 'id'> {
  createdBy: ObjectId;
  removedBy?: ObjectId;
}

const typeSchema = new mongoose.Schema<TypeDocument>({
  name: {
    type: String,
    unique: true,
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
  removedAt: {
    type: Date,
    required: false,
  },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Type', typeSchema);
