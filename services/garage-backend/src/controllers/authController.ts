import { Handler } from 'express';
import jwt from 'jsonwebtoken';
import { fromUnixTime, isBefore } from 'date-fns';

import { BadRequestError, UnauthorizedError } from '../helpers/apiError';
import { validateToken } from '../helpers/nokiaLogin';
import config from '../config';
import { encrypt } from '../helpers/crypto';
import { upsertUser } from '../services/userService';
import { serializeUser } from '../serializers/users';

export const postLogin: Handler = async (req, res, next) => {
  const { token, email, fullName, exp } = req.body;

  if (!token || !email || !fullName || !exp || isBefore(fromUnixTime(exp), new Date())) {
    next(new BadRequestError());

    return;
  }

  const isTokenValid = await validateToken(token, email);

  if (!isTokenValid) {
    next(new BadRequestError('Invalid token'));

    return;
  }
  const encryptedToken = encrypt(token);

  const userDocument = await upsertUser(
    email,
    fullName,
    encryptedToken.content,
    exp,
    encryptedToken.iv,
  );

  const serializedUser = await serializeUser(userDocument!);

  const jwtToken = jwt.sign(serializedUser, config.jwtSecret);

  res.status(200).send({
    user: serializedUser,
    token: jwtToken,
  });
};

export const getMe: Handler = async (req, res, next) => {
  if (req.user) {
    res.json(await serializeUser(req.user));
  } else {
    next(new UnauthorizedError());
  }
};
