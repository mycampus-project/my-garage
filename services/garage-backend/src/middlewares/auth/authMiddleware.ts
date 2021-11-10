import { Handler, Request } from 'express';
import jwt from 'jsonwebtoken';
import { addSeconds, isAfter } from 'date-fns';

import { decrypt } from '../../helpers/crypto';
import User, { UserDocument } from '../../models/User';
import { validateJwt } from '../../helpers/authUtils';
import { validateToken } from '../../helpers/nokiaLogin';

const TOKEN_REVALIDATION_TIME_SECONDS = 24 * 60 * 60; // 1 day. hours * minutes * seconds

const validateNokiaToken = async (user: UserDocument) => {
  const { tokenExp, tokenVerifiedAt, tokenIv, token } = user;
  const now = new Date();

  // Check if token is expired
  if (tokenExp < now.getTime() / 1000) {
    return false;
  }

  // Nokia token is revalidated against their auth every TOKEN_REVALIDATION_TIME_SECONDS
  if (isAfter(now, addSeconds(tokenVerifiedAt, TOKEN_REVALIDATION_TIME_SECONDS))) {
    const decryptedToken = decrypt({ iv: tokenIv, content: token });

    if (!decryptedToken) return false;

    const tokenValid = validateToken(decryptedToken);

    if (!tokenValid) return false;

    await user.update({ tokenVerifiedAt: new Date() });

    return true;
  }

  return true;
};

const assignUser = async (req: Request) => {
  if (!req.headers.authorization?.startsWith('Bearer ')) return;

  const token = req.headers.authorization?.replace(/^Bearer\s/, '');
  if (!token) return;

  req.token = token;

  const isValid = validateJwt(token);

  if (!isValid) return;

  const decoded = jwt.decode(token, { json: true });
  const id = decoded?.id;

  if (!id) return;

  const user = await User.findById(id);
  if (!user || !(await validateNokiaToken(user))) return;

  req.user = user ?? undefined;
};

/**
 * Assigns `req.token` and `req.user` to express Request object.
 * Takes care of validating user's JWT and Nokia tokens when requred.
 *
 * @param req
 * @param _
 * @param next
 */
const authMiddleware: Handler = async (req, _, next) => {
  await assignUser(req);

  next();
};

export default authMiddleware;
