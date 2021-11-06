import { User } from '@my-garage/common';
import { Handler } from 'express';

import { validateToken } from '../helpers/nokiaLogin';

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

  const fakeUser: Partial<User> = {
    fullName: name,
    email,
  };

  res.status(200).send(fakeUser);
};

export const verifyTokenHandler: Handler = () => {};
