import mongoose from 'mongoose';

import config from './config';

function connect() {
  if (!config.db) throw Error('Env variable MONGODB_URL is not available');
  const options = { keepAlive: true, useNewUrlParser: true };
  mongoose.connect(config.db, options);

  return mongoose.connection;
}

const connection = connect();

// eslint-disable-next-line no-console
connection.on('error', console.log).on('disconnected', connect);

export default connection;
