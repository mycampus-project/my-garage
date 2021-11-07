import { Handler } from 'express';
import bcrypt from 'bcrypt';
import { User } from '@my-garage/common';
import jwt from 'jsonwebtoken';

import { validateToken } from '../helpers/nokiaLogin';
import config from '../config';

export const loginHandler: Handler = async (req, res) => {
  const { token, email, name } = req.body;

  if (!token || !email || !name) {
    // TODO: better error handling
    res.status(400).send({
      errors: [
        {
          message: 'Malformed request',
        },
      ],
    });

    return;
  }

  const isTokenValid = await validateToken(token);

  if (!isTokenValid) {
    res.status(400).send({
      errors: [
        {
          message: 'Invalid token',
        },
      ],
    });

    return;
  }

  // TODO: Check if user with that email exists

  // TODO: Create user if not present

  // TODO: save token to db
  // eslint-disable-next-line unused-imports/no-unused-vars
  const hashedToken = await bcrypt.hash(token, 10);

  const fakeUser: User = {
    fullName: name,
    email,
    createdAt: new Date(),
    roleId: '-1',
  };

  const jwtToken = jwt.sign(fakeUser, config.jwtSecret);

  res.status(200).send({
    token: jwtToken,
  });
};

export const verifyTokenHandler: Handler = () => {};
