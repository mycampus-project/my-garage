import Booking from '../models/Booking';

export const findBookingsFiltered = async (
  { userId, thingId }: { userId?: string; thingId?: string },
  { offset, limit, mode }: { offset?: number; limit?: number; mode: 'future' | 'past' },
) => {
  const now = new Date();
  const filter =
    mode === 'future'
      ? {
          startAt: {
            $lt: now,
          },
          endAt: {
            $lt: now,
          },
        }
      : {
          endAt: {
            $et: now,
          },
        };

  const bookings = await Booking.find(
    {
      user: userId,
      thing: thingId,
      ...filter,
    },
    null,
    {
      skip: offset,
      limit,
    },
  )
    .sort(mode === 'future' ? { startAt: 1 } : { endAt: -1 })
    .exec();

  return bookings;
};
