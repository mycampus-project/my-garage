import { ObjectId } from 'mongoose';

import Role from '../models/Role';
import User, { UserDocument } from '../models/User';

/**
 * Function for updating/creating user.
 * If db contains user with such email, it will update that record with new data.
 * If db does not contain user with such email, it'll create one.
 *
 * @param email
 * @param fullName
 * @param token - Encrypted token received from Nokia auth
 * @param tokenExp - Expiration date of the Nokia auth token
 * @param tokenIv - Initialization Value used to encrypt Nokia auth token
 * @returns
 */
// eslint-disable-next-line import/prefer-default-export
export const upsertUser = async (
  email: string,
  fullName: string,
  token: string,
  tokenExp: number,
  tokenIv: string,
) => {
  const userFromDb = await User.findOne({ email });

  if (userFromDb) {
    await userFromDb.updateOne({
      fullName,
      token,
      tokenIv,
      tokenExp,
      tokenVerifiedAt: new Date(),
    });

    return userFromDb;
  }
  const userRole = await Role.findOne({ name: 'user' });

  const user = new User({
    email,
    fullName,
    token,
    role: userRole,
    tokenIv,
    tokenExp,
    tokenVerifiedAt: new Date(),
  });

  await user?.save();

  return user;
};

function findUserById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }
      return user;
    });
}

function findAllUser() {
  return User.find().sort({ fullName: 1, email: -1 }).exec();
}

function updateUser(userId: string, update: Partial<UserDocument>): Promise<UserDocument> {
  return User.findByIdAndUpdate(userId, update, { new: true })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }
      return user;
    });
}

function deleteUser(userId: string, removedBy: ObjectId, removedAt: Date): Promise<UserDocument> {
  const update: Partial<UserDocument> = { removedAt, removedBy };
  return User.findByIdAndUpdate(userId, update, { new: true })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`Thing ${userId} not found`);
      }
      return user;
    });
}

export default {
  findUserById,
  findAllUser,
  updateUser,
  deleteUser,
};
