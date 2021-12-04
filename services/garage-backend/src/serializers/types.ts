import { Type } from '@my-garage/common';

import User, { UserDocument } from '../models/User';
import { TypeDocument } from '../models/Type';

// eslint-disable-next-line import/prefer-default-export
export const serializeType = async (type: TypeDocument): Promise<Type> => {
  const { _id: id, name, createdAt, removedAt, maxBookingDuration } = type;
  const createTypeWithUser = await type.populate<{ createdBy: UserDocument }>({
    path: 'createdBy',
    model: User,
  });
  const removeTypeWithUser = await type.populate<{ removedBy: UserDocument | null }>({
    path: 'removedBy',
    model: User,
  });

  return {
    id: id!.toString(),
    name,
    createdAt,
    createdBy: {
      id: createTypeWithUser.createdBy.id,
      fullName: createTypeWithUser.createdBy.fullName,
    },
    maxBookingDuration,
    removedAt,
    removedBy: removeTypeWithUser.removedBy
      ? {
          id: removeTypeWithUser.removedBy.id,
          fullName: removeTypeWithUser.removedBy.fullName,
        }
      : undefined,
  };
};
