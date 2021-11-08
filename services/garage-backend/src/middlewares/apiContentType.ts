import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../helpers/apiError';

// eslint-disable-next-line func-names
export default function (req: Request, res: Response, next: NextFunction) {
  if (
    (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') &&
    !req.is('application/json')
  ) {
    next(new BadRequestError());
  } else {
    next();
  }
}
