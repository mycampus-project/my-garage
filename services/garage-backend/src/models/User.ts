import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from '@my-garage/common';

export interface UserDocument extends Document<ObjectId>, Omit<User, 'removedBy' | 'role'> {
  removedBy: ObjectId;
  role: ObjectId;
}

const userSchema = new mongoose.Schema<UserDocument>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
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

export default mongoose.model('User', userSchema);
