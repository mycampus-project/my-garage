import { User } from '@my-garage/common';

import { UserDocument } from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const serializeUserDocument = ({
  fullName,
  email,
  createdAt,
  removedAt,
}: UserDocument): User => ({
  fullName,
  email,
  removedAt,
  createdAt,
  role: {
    createdAt: new Date(),
    name: 'admin',
  }, // TODO: serialize role properly
});
