const config = {
  db: process.env.MONGODB_URL,
  bcryptSecret: process.env.BCRYPT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};
Object.freeze(config);

export default config as Readonly<typeof config>;
