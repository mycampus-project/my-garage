import { User } from '@my-garage/common';

import { UserDocument } from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const serializeUserDocument = ({
  _id,
  fullName,
  email,
  createdAt,
  removedAt,
}: UserDocument): User => ({
  id: _id!.toString(),
  fullName,
  email,
  removedAt,
  createdAt,
  role: {
    createdAt: new Date(),
    name: 'admin',
  }, // TODO: serialize role properly
});
