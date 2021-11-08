import { Request, Response, NextFunction } from 'express';

import ApiError from '../helpers/apiError';

export default function apiErrorHandler(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.source) {
    console.error(error.source);
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode,
    message: error.message,
  });
}
