import { Thing } from '@my-garage/common';

import { UserDocument } from '../models/User';
import { ThingDocument } from '../models/Thing';
import { TypeDocument } from '../models/Type';

// eslint-disable-next-line import/prefer-default-export
export const serializeThing = async (thing: ThingDocument): Promise<Thing> => {
  const {
    _id: id,
    name,
    description,
    isAvailable,
    createdAt,
    removedAt,
    imageUrl,
    type,
    createdBy,
    removedBy,
    contactPerson,
  } = await thing.populate<{
    createdBy: UserDocument;
    removedBy: UserDocument | null;
    type: TypeDocument | null;
    contactPerson: UserDocument | null;
  }>(['createdBy', 'removedBy', 'type', 'contactPerson']);

  return {
    id: id!.toString(),
    name,
    description,
    isAvailable,
    type: type.name,
    createdAt,
    createdBy: {
      id: createdBy.id,
      fullName: createdBy.fullName,
    },
    removedAt,
    removedBy: removedBy
      ? {
          id: removedBy.id,
          fullName: removedBy.fullName,
        }
      : undefined,
    imageUrl,
    contactPerson: contactPerson
      ? { fullName: contactPerson.fullName, email: contactPerson.email }
      : {
          fullName: createdBy.fullName,
          email: createdBy.email,
        },
    maxBookingDuration: type.maxBookingDuration,
  };
};
