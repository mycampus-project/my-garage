import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET!,
};

if (!config.jwtSecret) {
  throw Error('Please supply JWT_SECRET environment variable');
}

Object.freeze(config);

export default config;
