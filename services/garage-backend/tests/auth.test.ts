import { Request } from 'express';
import { addMinutes, addSeconds, getUnixTime, subSeconds } from 'date-fns';
import db from './db';
import jwt, { JwtPayload } from 'jsonwebtoken';

import * as auth from '../src/controllers/authController';
import { createMockResponse, mockValidateToken } from './utils';
import User from '../src/models/User';
import { BadRequestError } from '../src/helpers/apiError';
import Role from '../src/models/Role';

describe('auth', () => {
  beforeAll(db.connect);
  afterAll(db.closeDatabase);
  afterEach(db.clearDatabase);

  describe('postLogin', () => {
    it('creates user record when new user logs in', async () => {
      const mockedValidateToken = mockValidateToken(true);

      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: addMinutes(new Date(), 10),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      expect(await User.count()).toBe(0);

      await auth.postLogin(request as Request, response, next);

      expect(await User.count()).toBe(1);
      mockedValidateToken.mockRestore();
    });

    it('updates user record when existing user logs in', async () => {
      const mockedValidateToken = mockValidateToken(true);

      const email = 'test.test@test.com';
      const prevName = 'previous name';
      const nextName = 'next name';

      const role = await Role.findOne({ name: 'user' });

      const user = new User({
        fullName: prevName,
        email,
        role,
        token: 'test',
        tokenIv: 'test',
        tokenExp: 0,
      });

      await user.save();

      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email,
          fullName: nextName,
          exp: addMinutes(new Date(), 10),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      const updatedUser = await User.findOne({ email });
      expect(updatedUser?.fullName).toEqual(nextName);

      mockedValidateToken.mockRestore();
    });

    it('validates exp', async () => {
      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: getUnixTime(subSeconds(new Date(), 10)),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      expect(next).toBeCalledWith(new BadRequestError());
    });

    it('validates exp', async () => {
      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: getUnixTime(addSeconds(new Date(), 10)),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      expect(next).not.toBeCalledWith(new BadRequestError());
    });
    it('validates name', async () => {
      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email: 'test.test@test.com',
          exp: getUnixTime(addMinutes(new Date(), 10)),
        },
      };

      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      expect(next).toBeCalledWith(new BadRequestError());
    });

    it('validates token existance', async () => {
      const request: Partial<Request> = {
        body: {
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: getUnixTime(addMinutes(new Date(), 10)),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      expect(next).toBeCalledWith(new BadRequestError());
    });

    it('validates token against nokia', async () => {
      const mockedValidateToken = mockValidateToken(false);

      const request: Partial<Request> = {
        body: {
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: getUnixTime(addMinutes(new Date(), 10)),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      expect(next).toBeCalledWith(new BadRequestError());

      mockedValidateToken.mockRestore();
    });

    it('returns token when successful login happens', async () => {
      const mockedValidateToken = mockValidateToken(true);

      const request: Partial<Request> = {
        body: {
          token: 'foobar',
          email: 'test.test@test.com',
          fullName: 'Test Test',
          exp: getUnixTime(addMinutes(new Date(), 10)),
        },
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.postLogin(request as Request, response, next);

      const sentResponse = (response.send as jest.Mock).mock.calls[0][0];
      expect(sentResponse).toHaveProperty('token');
      expect(() => jwt.verify(sentResponse.token, process.env.JWT_SECRET!)).not.toThrow();
      expect((jwt.decode(sentResponse.token) as JwtPayload).email).toBe('test.test@test.com');

      mockedValidateToken.mockRestore();
    });
  });

  describe('getMe', () => {
    it('returns serialized user record', async () => {
      const mockedValidateToken = mockValidateToken(true);

      const user = new User({
        fullName: 'test',
        email: 'test@test.test',
        role: await Role.findOne({ name: 'user' }),
        token: 'test',
        tokenIv: 'test',
        tokenExp: 0,
      });

      await user.save();
      const request: Partial<Request> = {
        user,
      };
      const response = createMockResponse();
      const next = jest.fn();

      await auth.getMe(request as Request, response, next);

      const sentResponse = (response.json as jest.Mock).mock.calls[0][0];

      expect(sentResponse).toHaveProperty('id');
      expect(sentResponse).toHaveProperty('fullName');
      expect(sentResponse).toHaveProperty('email');
      mockedValidateToken.mockRestore();
    });
  });
});
