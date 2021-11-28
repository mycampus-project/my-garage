import Booking from '../models/Booking';
import Thing from '../models/Thing';
import { BadRequestError } from './apiError';

const validateStartEndTime = async ({ startAt, endAt }: { startAt: Date; endAt: Date }) => {
  const count = await Booking.count({
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

  console.log({ count });

  if (count > 0) {
    throw new BadRequestError('Booking overlaps with an existing booking');
  }
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

  const { startAt, endAt } = parseDates({ startAt: startAtString, endAt: endAtString });

  await validateThingId(thingId);

  await validateStartEndTime({ startAt, endAt });
};

export default validateBookingParams;
