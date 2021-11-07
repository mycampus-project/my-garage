import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET!,
  cryptoSecret: process.env.CRYPTO_SECRET!,
};

if (!config.jwtSecret) {
  throw Error('Please supply JWT_SECRET environment variable');
}
if (!config.cryptoSecret) {
  throw Error('Please supply CRYPTO_SECRET environment variable');
}

Object.freeze(config);

export default config;
