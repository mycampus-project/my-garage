import { NextFunction, Request, Response } from 'express';
import { Booking } from '@my-garage/common';

import { serializeBooking } from '../serializers/bookings';
import parseNumericQuery from '../helpers/parseQuery';
import Role from '../models/Role';
import {
  BadRequestError,
  InternalServerError,
  isOwnError,
  UnauthorizedError,
} from '../helpers/apiError';
import { findBookingsFiltered } from '../services/bookingService';

export const getBookings = async (
  req: Request<
    never,
    Array<Booking>,
    never,
    { userId?: string; thingId?: string; offset?: string; limit?: string; mode?: 'future' | 'past' }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new InternalServerError('Issues with finding request user');
    }

    const { userId, thingId, mode = 'future' } = req.query;

    if (!['future', 'past'].includes(mode)) {
      throw new BadRequestError('`mode` param should be either `future` or `past`');
    }

    const { limit = 10, offset = 0 } = parseNumericQuery({
      offset: req.query.offset,
      limit: req.query.limit,
    });

    const userWithRole = await req.user.populate<{ role: typeof Role }>({
      path: 'role',
      model: Role,
    });

    if (userId && userWithRole.id !== userId && userWithRole.role.name !== 'admin') {
      throw new UnauthorizedError("Only admins are allowed to get other users' bookings");
    }

    const bookings = await findBookingsFiltered({ userId, thingId }, { offset, limit, mode });

    res.send(
      Promise.all(
        bookings.map((booking) => serializeBooking(booking, userWithRole.role.name === 'admin')),
      ),
    );
  } catch (error) {
    next(isOwnError(error as Error) ? error : new InternalServerError(undefined, error as Error));
  }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction) => {};
