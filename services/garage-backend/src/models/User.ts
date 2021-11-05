import mongoose, { Document } from 'mongoose';
import { User } from '@my-garage/common';

export type UserDocument = Document & User;

const userSchema = new mongoose.Schema<UserDocument>({
  fullName: {
    type: String,
    index: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roleId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  createdAt: {
    type: Date,
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

export default mongoose.model('User', userSchema);
