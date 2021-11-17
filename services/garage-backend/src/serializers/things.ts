import { Thing } from '@my-garage/common';

import User, { UserDocument } from '../models/User';
import { ThingDocument } from '../models/Thing';

// eslint-disable-next-line import/prefer-default-export
export const serializeThing = async (thing: ThingDocument): Promise<Thing> => {
  const { _id: id, name, description, type, isAvailable, createdAt, removedAt, removedBy } = thing;
  const thingWithUser = await thing.populate<{ createdBy: UserDocument }>({
    path: 'createdBy',
    model: User,
  });

  return {
    id: id!.toString(),
    name,
    description,
    type,
    isAvailable,
    removedAt,
    removedBy: removedBy.toString(),
    createdAt,
    createdBy: { id: thingWithUser.createdBy.id, fullName: thingWithUser.createdBy.fullName },
  };
};
