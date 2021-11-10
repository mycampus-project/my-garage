import { User } from '@my-garage/common';

import Role, { RoleDocument } from '../models/Role';
import { UserDocument } from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const serializeUser = async (user: UserDocument): Promise<User> => {
  const { _id: id, fullName, email, createdAt, removedAt } = user;
  const userWithRole = await user.populate<{ role: RoleDocument }>({ path: 'role', model: Role });

  return {
    id: id!.toString(),
    fullName,
    email,
    removedAt,
    createdAt,
    role: userWithRole.role.name,
  };
};
