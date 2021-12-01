import { BOOKING_UNIT, END_HOUR, START_HOUR } from '@my-garage/common';
import { isBefore, isEqual, isFuture } from 'date-fns';

import Booking, { BookingDocument } from '../models/Booking';
import Thing from '../models/Thing';
import { BadRequestError } from './apiError';

const validateIntersectingWithOtherBookings = async (
  {
    startAt,
    endAt,
  }: {
    startAt: Date;
    endAt: Date;
  },
  thingId?: string,
  bookingId?: string,
) => {
  const count = await Booking.count({
    thing: thingId,
    _id: { $not: { $eq: bookingId } },
    $or: [
      {
        $and: [
          {
            startAt: { $lte: startAt },
          },
          {
            endAt: { $gt: startAt },
          },
        ],
      },
      { $and: [{ startAt: { $gte: startAt } }, { startAt: { $lt: endAt } }] },
    ],
  });

  if (count > 0) {
    throw new BadRequestError('Booking overlaps with an existing booking');
  }
};

const validateOrder = ({ startAt, endAt }: { startAt: Date; endAt: Date }) => {
  if (isBefore(endAt, startAt) || isEqual(endAt, startAt)) {
    throw new BadRequestError('endAt is invalid');
  }
};

const validateMinutesSeconds = ({ startAt, endAt }: { startAt: Date; endAt: Date }) => {
  if (startAt.getMilliseconds() !== 0 || startAt.getSeconds() !== 0) {
    throw new BadRequestError('startAt seconds and milliseconds should be 0');
  }
  if (endAt.getMilliseconds() !== 0 || endAt.getSeconds() !== 0) {
    throw new BadRequestError('endAt seconds and milliseconds should be 0');
  }

  if (startAt.getMinutes() % BOOKING_UNIT !== 0) {
    throw new BadRequestError(`startAt minutes should be evenly divisible by ${BOOKING_UNIT}`);
  }
  if (endAt.getMinutes() % BOOKING_UNIT !== 0) {
    throw new BadRequestError(`endAt minutes should be evenly divisible by ${BOOKING_UNIT}`);
  }

  if (startAt.getHours() < START_HOUR) {
    throw new BadRequestError(`Booking should start earliest ${START_HOUR}:00`);
  }
  if (endAt.getHours() > END_HOUR) {
    throw new BadRequestError(`Booking should end latest ${END_HOUR}:00`);
  }
};

const validateIsInFuture = ({ endAt }: { startAt: Date; endAt: Date }) => {
  if (!isFuture(endAt)) {
    throw new BadRequestError('Booking can not end in past');
  }
};

const validateStartEndTime = async (
  interval: { startAt: Date; endAt: Date },
  thingId?: string,
  bookingId?: string,
) => {
  validateOrder(interval);
  validateMinutesSeconds(interval);
  validateIsInFuture(interval);
  await validateIntersectingWithOtherBookings(interval, thingId, bookingId);
};

const validateThingId = async (thingId: string) => {
  const thing = await Thing.findOne({ id: thingId });
  if (!thing || thing.removedAt) {
    throw new BadRequestError('Thing not found');
  }
};

const parseDates = ({ startAt, endAt }: Pick<Params, 'startAt' | 'endAt'>) => {
  const parsedStartAt = new Date(startAt);
  const parsedEndAt = new Date(endAt);

  if (Number.isNaN(parsedStartAt.getTime()) || Number.isNaN(parsedEndAt.getTime)) {
    throw new BadRequestError('Unparceable dates');
  }

  return {
    startAt: parsedStartAt,
    endAt: parsedEndAt,
  };
};

type Params = { startAt: string; endAt: string } & (
  | {
      thingId: string;
    }
  | {
      booking: BookingDocument;
    }
);

const validateBookingParams = async ({
  startAt: startAtString,
  endAt: endAtString,
  ...rest
}: Params) => {
  if (!startAtString || !endAtString) {
    throw new BadRequestError('Missing parameters');
  }
  const { startAt, endAt } = parseDates({ startAt: startAtString, endAt: endAtString });

  if ('thingId' in rest) {
    await validateThingId(rest.thingId);

    await validateStartEndTime({ startAt, endAt }, rest.thingId);
  } else {
    const { booking } = rest;

    await validateStartEndTime({ startAt, endAt }, booking.thing._id.toString(), booking.id);
  }
};

export default validateBookingParams;
