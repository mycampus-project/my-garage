import { NextFunction, Request, Response } from 'express';
import { Booking, BookingWithUser } from '@my-garage/common';

import validateBookingParams from '../helpers/validateBookingParams';
import { serializeBooking } from '../serializers/bookings';
import parseNumericQuery from '../helpers/parseQuery';
import Role from '../models/Role';
import {
  BadRequestError,
  InternalServerError,
  isOwnError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError';
import { createBooking, findBookingsFiltered, updateBooking } from '../services/bookingService';
import BookingModel from '../models/Booking';

export const getBookings = async (
  req: Request<
    never,
    Array<Booking>,
    never,
    {
      userId?: string;
      thingId?: string;
      offset?: string;
      limit?: string;
      mode?: 'future' | 'past';
      start?: string;
      end?: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new InternalServerError('Issues with finding request user');
    }

    const { userId, thingId, mode = 'future', start, end } = req.query;

    if (!['future', 'past'].includes(mode)) {
      throw new BadRequestError('`mode` param should be either `future` or `past`');
    }

    if ((start && !end) || (!start && end)) {
      throw new BadRequestError(
        'please specify both `start` and `end` if you want to search by dates',
      );
    }

    const { limit = 10, offset = 0 } = parseNumericQuery({
      offset: req.query.offset,
      limit: req.query.limit,
    });

    const parsedStart = start !== undefined ? new Date(start) : undefined;
    const parsedEnd = end !== undefined ? new Date(end) : undefined;

    if (Number.isNaN(parsedStart?.getTime()) || Number.isNaN(parsedEnd?.getTime())) {
      throw new BadRequestError('Could not parse one of the dates');
    }

    const userWithRole = await req.user.populate<{ role: typeof Role }>({
      path: 'role',
      model: Role,
    });

    if (userId && userWithRole.id !== userId && userWithRole.role.name !== 'admin') {
      throw new UnauthorizedError("Only admins are allowed to get other users' bookings");
    }

    const { bookings, total } = await findBookingsFiltered(
      { userId, thingId },
      { offset, limit, mode, start: parsedStart, end: parsedEnd },
    );

    res.send({
      offset,
      limit,
      total,
      items: await Promise.all(
        bookings.map((booking) => serializeBooking(booking, userWithRole.role.name === 'admin')),
      ),
    });
  } catch (e) {
    const error = e as Error;
    next(isOwnError(error) ? error : new InternalServerError(error.message, error));
  }
};

export const postBooking = async (
  req: Request<
    never,
    BookingWithUser,
    {
      thingId: string;
      startAt: string;
      endAt: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { thingId, startAt, endAt } = req.body;

    if (!req.user?.id) {
      throw new InternalServerError('Cannot find user');
    }

    await validateBookingParams(req.body);

    const booking = await createBooking({
      thingId,
      userId: req.user.id,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
    });

    res.send(await serializeBooking(booking, true));
  } catch (error) {
    next(isOwnError(error as Error) ? error : new InternalServerError(undefined, error as Error));
  }
};

export const getBooking = async (
  req: Request<{ bookingId: string }, Booking | BookingWithUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params;

    if (!req.user) throw new InternalServerError('Could not get user');

    const booking = await BookingModel.findById(bookingId);

    if (booking === null) {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }

    const userRole = await Role.findById(req.user.role);
    if (!userRole) throw new InternalServerError("Could not get user's role");

    if (userRole.name === 'admin' || booking.user.toString() === req.user.id) {
      res.send(await serializeBooking(booking, true));
    } else {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }
  } catch (e) {
    const error = e as Error;
    next(isOwnError(error) ? error : new InternalServerError(error.message, error));
  }
};

export const putBooking = async (
  req: Request<{ bookingId: string }, BookingWithUser, { startAt?: string; endAt?: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params;

    if (!req.user) throw new InternalServerError('Could not get user');

    const booking = await BookingModel.findById(bookingId);

    if (booking === null) {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }

    const { startAt = booking.startAt.toISOString(), endAt = booking.endAt.toISOString() } =
      req.body;

    const userRole = await Role.findById(req.user.role);
    if (!userRole) throw new InternalServerError("Could not get user's role");

    if (userRole.name === 'admin' || booking.user.toString() === req.user.id) {
      await validateBookingParams({
        startAt,
        endAt,
        booking,
      });

      await updateBooking({
        booking,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      });
      res.send(await serializeBooking(booking, true));
    } else {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }
  } catch (e) {
    const error = e as Error;
    next(isOwnError(error) ? error : new InternalServerError(error.message, error));
  }
};

export const deleteBooking = async (
  req: Request<{ bookingId: string }, Booking | BookingWithUser>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingId } = req.params;

    if (!req.user) throw new InternalServerError('Could not get user');

    const booking = await BookingModel.findById(bookingId);

    if (booking === null) {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }

    const userRole = await Role.findById(req.user.role);
    if (!userRole) throw new InternalServerError("Could not get user's role");

    if (userRole.name === 'admin' && booking.user.toString() === req.user.id) {
      await booking.delete();
      res.send({ status: 'success' });
    } else {
      throw new NotFoundError(`Booking with id ${bookingId} could not be found`);
    }
  } catch (e) {
    const error = e as Error;
    next(isOwnError(error) ? error : new InternalServerError(error.message, error));
  }
};
