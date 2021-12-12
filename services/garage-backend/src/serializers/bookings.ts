import { BaseBooking, Booking, BookingWithUser } from '@my-garage/common';

import { TypeDocument } from '../models/Type';
import { ThingDocument } from '../models/Thing';
import { UserDocument } from '../models/User';
import { BookingDocument } from '../models/Booking';

export async function serializeBooking(
  booking: BookingDocument,
  includeUserDetails: true,
): Promise<BookingWithUser>;
export async function serializeBooking(
  booking: BookingDocument,
  includeUserDetails?: false,
): Promise<Booking>;
export async function serializeBooking(
  booking: BookingDocument,
  includeUserDetails?: boolean,
): Promise<Booking | BookingWithUser>;
export async function serializeBooking(
  booking: BookingDocument,
  includeUserDetails?: boolean,
): Promise<Booking | BookingWithUser> {
  const { id, user, thing, createdAt, startAt, endAt } = await booking.populate<{
    user: UserDocument;
    thing: ThingDocument;
  }>(['user', 'thing']);

  const { contactPerson, createdBy: thingCreatedBy } = await thing.populate<{
    createdBy: UserDocument;
    contactPerson: UserDocument | null;
  }>(['createdBy', 'contactPerson']);

  const base: BaseBooking = {
    id,
    thing: {
      id: thing.id,
      description: thing.description,
      name: thing.name,
      type: (await thing.populate<{ type: TypeDocument }>('type')).type.name,
      imageUrl: thing.imageUrl,
      contactPerson: contactPerson
        ? { fullName: contactPerson.fullName, email: contactPerson.email }
        : {
            fullName: thingCreatedBy.fullName,
            email: thingCreatedBy.email,
          },
    },
    createdAt,
    startAt,
    endAt,
  };

  if (includeUserDetails) {
    return {
      ...base,
      user: {
        fullName: user.fullName,
        id: user.id,
        email: user.email,
      },
    };
  }
  return {
    ...base,
    userId: user.id,
  };
}
