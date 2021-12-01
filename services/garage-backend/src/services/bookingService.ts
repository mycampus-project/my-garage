import { endOfDay, startOfDay } from 'date-fns';
import { FilterQuery } from 'mongoose';

import Booking, { BookingDocument } from '../models/Booking';

const getFilter = (mode: 'future' | 'past', date?: Date) => {
  if (date) {
    return {
      $or: [
        {
          $and: [
            {
              startAt: { $lte: startOfDay(date) },
            },
            {
              endAt: { $gt: startOfDay(date) },
            },
          ],
        },
        { $and: [{ startAt: { $gte: startOfDay(date) } }, { startAt: { $lt: endOfDay(date) } }] },
      ],
    };
  }
  const now = new Date();

  return mode === 'future'
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
};

export const findBookingsFiltered = async (
  { userId, thingId }: { userId?: string; thingId?: string },
  {
    offset,
    limit,
    mode,
    date,
  }: { offset?: number; limit?: number; mode: 'future' | 'past'; date?: Date },
) => {
  const filter = getFilter(mode, date);

  console.log(filter);

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

export const updateBooking = async ({
  booking,
  startAt,
  endAt,
}: {
  booking: BookingDocument;
  startAt: Date;
  endAt: Date;
}) => {
  booking.startAt = startAt;
  booking.endAt = endAt;
  return booking.save;
};
