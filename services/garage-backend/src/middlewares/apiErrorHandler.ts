import { Request, Response, NextFunction } from 'express';

import ApiError from '../helpers/apiError';

export default function apiErrorHandler(
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status('statusCode' in error ? error.statusCode : 500).json({
    status: 'error',
    message: error.message,
  });
}
