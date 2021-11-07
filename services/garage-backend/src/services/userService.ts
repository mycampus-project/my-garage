import User from '../models/User';

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
  const user = await User.findOneAndUpdate(
    {
      email,
    },
    {
      email,
      fullName,
      token,
      tokenIv,
      tokenExp,
      tokenVerifiedAt: new Date(),
    },
    {
      upsert: true,
    },
  );

  // If a new user was created, `user` is null, hence we need to find it
  // Dunno why
  if (user === null) {
    const userFromDb = await User.findOne({ email });

    return userFromDb;
  }

  await user?.save();

  return user;
};
