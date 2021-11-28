import mongoose, { Document, Types } from 'mongoose';
import { Role } from '@my-garage/common';

export interface RoleDocument extends Document<Types.ObjectId>, Omit<Role, 'removedBy'> {
  removedBy: Types.ObjectId;
}

const roleSchema = new mongoose.Schema<RoleDocument>({
  name: {
    type: String,
    index: true,
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

export default mongoose.model('Role', roleSchema);
