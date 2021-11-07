import { Handler } from 'express';
import jwt from 'jsonwebtoken';

import { validateJwt } from '../helpers/auth';
import { validateToken } from '../helpers/nokiaLogin';
import config from '../config';
import { encrypt } from '../helpers/crypto';
import { upsertUser } from '../services/userService';
import { serializeUserDocument } from '../helpers/users';

export const loginHandler: Handler = async (req, res) => {
  const { token, email, fullName, exp } = req.body;

  if (!token || !email || !fullName || !exp) {
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
  const encodedToken = encrypt(token);

  const userDocument = await upsertUser(
    email,
    fullName,
    encodedToken.content,
    exp,
    encodedToken.iv,
  );

  if (!userDocument) {
    throw Error('Could not create user????');
  }

  const serializedUser = serializeUserDocument(userDocument);

  const jwtToken = jwt.sign(serializedUser, config.jwtSecret);

  res.status(200).send({
    user: serializedUser,
    token: jwtToken,
  });
};

export const validateTokenHandler: Handler = async (req, res) => {
  const { token } = req.body;

  if (!token) {
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

  const isValid = validateJwt(token);

  if (isValid) {
    res.status(200).send({ message: 'Token valid' });
  } else {
    res.status(400).send({ errors: [{ message: 'Token invalid' }] });
  }
};
