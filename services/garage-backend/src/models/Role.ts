import mongoose, { Document } from 'mongoose';
import { Role } from '@my-garage/common';

export type RoleDocument = Document & Role;

const roleSchema = new mongoose.Schema<RoleDocument>({
  name: {
    type: String,
    index: true,
    required: true,
  },
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

export default mongoose.model('Role', roleSchema);
