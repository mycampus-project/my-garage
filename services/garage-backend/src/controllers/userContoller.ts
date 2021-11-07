import { Handler } from 'express';
import jwt from 'jsonwebtoken';

import { validateToken } from '../helpers/nokiaLogin';
import config from '../config';
import { encrypt } from '../helpers/crypto';
import { upsertUser } from '../services/userService';
import { serializeUserDocument } from '../helpers/users';

// eslint-disable-next-line import/prefer-default-export
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
  const encryptedToken = encrypt(token);

  const userDocument = await upsertUser(
    email,
    fullName,
    encryptedToken.content,
    exp,
    encryptedToken.iv,
  );

  const serializedUser = serializeUserDocument(userDocument!);

  const jwtToken = jwt.sign(serializedUser, config.jwtSecret);

  res.status(200).send({
    user: serializedUser,
    token: jwtToken,
  });
};
