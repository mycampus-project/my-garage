import { FilterQuery } from 'mongoose';

import Booking, { BookingDocument } from '../models/Booking';

export const findBookingsFiltered = async (
  { userId, thingId }: { userId?: string; thingId?: string },
  { offset, limit, mode }: { offset?: number; limit?: number; mode: 'future' | 'past' },
) => {
  const now = new Date();
  const filter =
    mode === 'future'
      ? {
          endAt: {
            $gte: now,
          },
        }
      : {
          endAt: {
            $lte: now,
          },
        };

  const query: FilterQuery<BookingDocument> = {
    ...filter,
  };

  if (userId) {
    query.user = userId;
  }
  if (thingId) {
    query.thing = thingId;
  }

  const bookings = await Booking.find(query, null, {
    skip: offset,
    limit,
  }).sort(mode === 'future' ? { startAt: 1 } : { endAt: -1 });

  const total = await Booking.count(query).exec();

  return { bookings, total };
};

export const createBooking = async ({
  thingId,
  userId,
  startAt,
  endAt,
}: {
  thingId: string;
  userId: string;
  startAt: Date;
  endAt: Date;
}) => {
  const booking = new Booking({
    thing: thingId,
    user: userId,
    startAt,
    endAt,
  });

  return booking.save();
};
