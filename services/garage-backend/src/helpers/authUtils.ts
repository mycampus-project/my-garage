import jwt from 'jsonwebtoken';

import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export const validateJwt = (token: string) => {
  try {
    jwt.verify(token, config.jwtSecret);

    return true;
  } catch {
    return false;
  }
};
