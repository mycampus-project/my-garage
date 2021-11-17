import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createRoles from '../src/helpers/createRoles';

let mongod: MongoMemoryServer;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();
  await mongoose.connect(uri);
  await createRoles();
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map((collection) => {
      if (collection.name === 'roles') return;
      collection.deleteMany({});
    }),
  );
};

export default {
  connect,
  closeDatabase,
  clearDatabase,
};
