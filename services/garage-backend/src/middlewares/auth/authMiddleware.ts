import { Handler, Request } from 'express';
import jwt from 'jsonwebtoken';
import { addSeconds, isAfter } from 'date-fns';

import { decrypt } from '../../helpers/crypto';
import User, { UserDocument } from '../../models/User';
import { validateJwt } from '../../helpers/auth';
import { validateToken } from '../../helpers/nokiaLogin';

const TOKEN_REVALIDATION_TIME_SECONDS = 24 * 60 * 60; // 1 day. hours * minutes * seconds

const validateNokiaToken = async ({ tokenExp, tokenVerifiedAt, tokenIv, token }: UserDocument) => {
  const now = new Date();

  // Check if token is expired
  if (tokenExp < now.getTime() / 1000) {
    return false;
  }

  // Nokia token is revalidated against their auth every TOKEN_REVALIDATION_TIME_SECONDS
  if (isAfter(now, addSeconds(tokenVerifiedAt, TOKEN_REVALIDATION_TIME_SECONDS))) {
    const decryptedToken = decrypt({ iv: tokenIv, content: token });

    if (!decryptedToken) return false;

    return validateToken(decryptedToken);
  }

  return true;
};

const assignUser = async (req: Request) => {
  const token = req.headers.authorization?.replace(/^Bearer\s/, '');
  if (!token) return;

  req.token = token;

  const isValid = validateJwt(token);

  if (!isValid) return;

  const decoded = jwt.decode(token, { json: true });
  const id = decoded?.id;

  if (!id) return;

  const user = await User.findOne({ id });

  if (!user || !(await validateNokiaToken(user))) return;

  user.tokenVerifiedAt = new Date();
  await user.save();

  req.user = user ?? undefined;
};

const authMiddleware: Handler = async (req, _, next) => {
  assignUser(req);

  next();
};

export default authMiddleware;
