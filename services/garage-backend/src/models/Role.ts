import mongoose, { Document, ObjectId } from 'mongoose';
import { Role } from '@my-garage/common';

export interface RoleDocument extends Document<ObjectId>, Omit<Role, 'removedBy'> {
  removedBy: ObjectId;
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
