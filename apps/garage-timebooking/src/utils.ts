import { Booking, BookingWithUser } from '@my-garage/common';

// eslint-disable-next-line import/prefer-default-export
export const mapBooking = <T extends Booking | BookingWithUser>(bookingData: {
  startAt: string;
  endAt: string;
}): T =>
  ({
    ...bookingData,
    startAt: new Date(bookingData.startAt),
    endAt: new Date(bookingData.endAt),
  } as T);
