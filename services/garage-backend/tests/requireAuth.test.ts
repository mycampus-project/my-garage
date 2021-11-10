import { NextFunction, Request, Response } from 'express';

import { UserDocument } from '../src/models/User';
import { UnauthorizedError } from '../src/helpers/apiError';
import { requireAuth } from '../src/middlewares/auth';

describe('requireAuth', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  describe('without roles', () => {
    it('returns error if no user is provided', () => {
      requireAuth()(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toBeCalledWith(new UnauthorizedError());
    });

    it('does not return errors if user is present', () => {
      mockRequest = {
        user: {
          id: 'foo',
          fullName: 'bar',
        } as UserDocument,
      };

      requireAuth()(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith();
    });
  });

  describe('with roles', () => {
    it('returns UnauthorizedError if no user is passed', () => {
      requireAuth('admin')(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(new UnauthorizedError());
    });

    it('returns UnauthorizedError if user has incorrect role', async () => {
      mockRequest = {
        user: {
          id: 'foo',
          fullName: 'bar',
          populate: () =>
            Promise.resolve({
              id: 'foo',
              fullName: 'bar',
              role: {
                name: 'user',
              },
            } as unknown as UserDocument),
        } as unknown as UserDocument,
      };

      await requireAuth('admin')(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(new UnauthorizedError());
    });

    it('does not return anything if user has correct role', async () => {
      mockRequest = {
        user: {
          id: 'foo',
          fullName: 'bar',
          populate: () =>
            Promise.resolve({
              id: 'foo',
              fullName: 'bar',
              role: {
                name: 'admin',
              },
            } as unknown as UserDocument),
        } as unknown as UserDocument,
      };

      await requireAuth('admin')(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith();
    });
  });
});
