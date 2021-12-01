import mongoose, { Document, Types } from 'mongoose';
import { User } from '@my-garage/common';

export interface UserDocument
  extends Document<Types.ObjectId>,
    Omit<User, 'removedBy' | 'role' | 'id'> {
  removedBy?: Types.ObjectId;
  role: Types.ObjectId;
  token: string;
  tokenIv: string;
  tokenExp: number;
  tokenVerifiedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  token: {
    type: String,
    required: true,
  },
  tokenIv: {
    type: String,
    required: true,
  },
  tokenExp: {
    type: Number,
    required: true,
  },
  tokenVerifiedAt: {
    type: Date,
    required: false,
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
