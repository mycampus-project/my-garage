import { Response } from 'express';
import { UserDocument } from '../src/models/User';

export const createMockResponse = () => {
  const res: Partial<Response> = {
    send: jest.fn().mockImplementation(() => res),
    status: jest.fn().mockImplementation(() => res),
    json: jest.fn().mockImplementation(() => res),
  };

  return res as Response;
};

export const mockValidateToken = (response: boolean) => {
  const validateToken = jest.spyOn(require('../src/helpers/nokiaLogin'), 'validateToken');
  validateToken.mockImplementation(() => Promise.resolve(response));

  return validateToken;
};
