import { Thing } from '@my-garage/common';

import User, { UserDocument } from '../models/User';
import { ThingDocument } from '../models/Thing';

// eslint-disable-next-line import/prefer-default-export
export const serializeThing = async (thing: ThingDocument): Promise<Thing> => {
  const { _id: id, name, description, type, isAvailable, createdAt, removedAt } = thing;
  const createThingWithUser = await thing.populate<{ createdBy: UserDocument }>({
    path: 'createdBy',
    model: User,
  });
  const removeThingWithUser = await thing.populate<{ removedBy: UserDocument }>({
    path: 'removedBy',
    model: User,
  });

  return {
    id: id!.toString(),
    name,
    description,
    type,
    isAvailable,
    createdAt,
    createdBy: {
      id: createThingWithUser.createdBy.id,
      fullName: createThingWithUser.createdBy.fullName,
    },
    removedAt,
    removedBy: {
      id: removeThingWithUser.removedBy.id,
      fullName: removeThingWithUser.removedBy.fullName,
    },
  };
};
