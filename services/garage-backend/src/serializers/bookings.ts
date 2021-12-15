import { BaseBooking, Booking, BookingWithPrevious, BookingWithUser } from '@my-garage/common';

import { TypeDocument } from '../models/Type';
import { ThingDocument } from '../models/Thing';
import { UserDocument } from '../models/User';
import BookingModel, { BookingDocument } from '../models/Booking';

async function serializeBaseBooking(booking: BookingDocument) {
  const { id, thing, createdAt, startAt, endAt } = await booking.populate<{
    thing: ThingDocument;
  }>(['thing']);

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

  return base;
}

export async function serializeSimpleBooking(booking: BookingDocument): Promise<Booking> {
  const base = await serializeBaseBooking(booking);

  return { ...base, userId: booking.userId };
}

export async function serializeBookingWithUser(
  booking: BookingDocument,
  includePrevious?: boolean,
): Promise<Booking | BookingWithUser | BookingWithPrevious> {
  const base = await serializeBaseBooking(booking);

  const { user } = await booking.populate<{
    user: UserDocument;
  }>(['user']);

  const previousBookingList = await BookingModel.find({
    thing: booking.thing,
    endAt: {
      $lt: booking.startAt,
    },
  })
    .sort({ endAt: -1 })
    .limit(1)
    .exec();

  const previousBooking = await previousBookingList[0]?.populate<{ user: UserDocument }>('user');

  return {
    ...base,
    user: {
      fullName: user.fullName,
      id: user.id,
      email: user.email,
    },
    previousUser:
      includePrevious && previousBooking
        ? {
            fullName: previousBooking.user.fullName,
            email: previousBooking.user.email,
          }
        : undefined,
  };
}
