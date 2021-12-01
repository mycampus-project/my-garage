import { BOOKING_UNIT, END_HOUR, START_HOUR } from '@my-garage/common';
import { isBefore, isEqual, isFuture } from 'date-fns';

import Booking from '../models/Booking';
import Thing from '../models/Thing';
import { BadRequestError } from './apiError';

const validateIntersectingWithOtherBookings = async (
  thingId: string,
  {
    startAt,
    endAt,
  }: {
    startAt: Date;
    endAt: Date;
  },
) => {
  const count = await Booking.count({
    thing: thingId,
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

const validateStartEndTime = async (thingId: string, interval: { startAt: Date; endAt: Date }) => {
  validateOrder(interval);
  validateMinutesSeconds(interval);
  validateIsInFuture(interval);
  await validateIntersectingWithOtherBookings(thingId, interval);
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

interface Params {
  thingId: string;
  startAt: string;
  endAt: string;
}

const validateBookingParams = async ({
  thingId,
  startAt: startAtString,
  endAt: endAtString,
}: Params) => {
  if (!thingId || !startAtString || !endAtString) {
    throw new BadRequestError('Missing parameters');
  }
  console.log(thingId);

  const { startAt, endAt } = parseDates({ startAt: startAtString, endAt: endAtString });

  await validateThingId(thingId);

  await validateStartEndTime(thingId, { startAt, endAt });
};

export default validateBookingParams;
