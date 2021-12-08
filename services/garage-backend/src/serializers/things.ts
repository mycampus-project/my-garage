import { Thing } from '@my-garage/common';

import User, { UserDocument } from '../models/User';
import { ThingDocument } from '../models/Thing';
import Type, { TypeDocument } from '../models/Type';

// eslint-disable-next-line import/prefer-default-export
export const serializeThing = async (thing: ThingDocument): Promise<Thing> => {
  const { _id: id, name, description, isAvailable, createdAt, removedAt, imageUrl } = thing;
  const createThingWithUser = await thing.populate<{ createdBy: UserDocument }>({
    path: 'createdBy',
    model: User,
  });
  const thingWithRemovedBy = await thing.populate<{ removedBy: UserDocument | null }>({
    path: 'removedBy',
    model: User,
  });
  const thingWithType = await thing.populate<{ type: TypeDocument | null }>({
    path: 'type',
    model: Type,
  });

  return {
    id: id!.toString(),
    name,
    description,
    type: thingWithType.type.name,
    isAvailable,
    createdAt,
    createdBy: {
      id: createThingWithUser.createdBy.id,
      fullName: createThingWithUser.createdBy.fullName,
    },
    removedAt,
    removedBy: thingWithRemovedBy.removedBy
      ? {
          id: thingWithRemovedBy.removedBy.id,
          fullName: thingWithRemovedBy.removedBy.fullName,
        }
      : undefined,
    imageUrl,
    contactPerson: {
      fullName: createThingWithUser.createdBy.fullName,
      email: createThingWithUser.createdBy.email,
    },
    maxBookingDuration: thingWithType.type.maxBookingDuration,
  };
};
