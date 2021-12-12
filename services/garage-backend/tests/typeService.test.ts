import Type from '../src/models/Type';
import TypeService from '../src/services/typeService';
import db from './db';

const nonExistingTypeId = require('mongoose').Types.ObjectId();
const randomObjectId = require('mongoose').Types.ObjectId();

async function createType() {
  const type = new Type({
    name: 'Compute',
    maxBookingDuration: 120,
  });
  return await TypeService.createType(type);
}

describe('type service', () => {
  beforeEach(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await db.clearDatabase();
  });

  afterEach(async () => {
    await db.closeDatabase();
  });

  it('should create a type', async () => {
    const thing = await createType();
    expect(thing).toHaveProperty('_id');
    expect(thing).toHaveProperty('name', 'Compute');
    expect(thing).toHaveProperty('maxBookingDuration', 120);
  });
});
