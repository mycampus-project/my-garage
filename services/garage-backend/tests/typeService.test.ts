import Type from '../src/models/Type';
import TypeService from '../src/services/typeService';
import db from './db';

const nonExistingTypeId = require('mongoose').Types.ObjectId();
const randomObjectId = require('mongoose').Types.ObjectId();

async function createType() {
  const type = new Type({
    name: 'Compute',
    maxBookingDuration: 120,
    createdBy: randomObjectId,
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

  it('should get a type with id', async () => {
    const type = await createType();
    const found = await TypeService.findTypeById(type.id);
    expect(found.name).toEqual(type.name);
    expect(found.maxBookingDuration).toEqual(type.maxBookingDuration);
  });

  it('should not get a non existing type', async () => {
    expect.assertions(1);
    return TypeService.findTypeById(nonExistingTypeId).catch((e) => {
      expect(e.message).toMatch(`Type ${nonExistingTypeId} not found`);
    });
  });

  it('should update an existing type', async () => {
    const type = await createType();
    const update = {
      name: 'Storage',
      maxBookingDuration: 60,
    };
    const updatedType = await TypeService.updateType(type.id, update);
    expect(updatedType).toHaveProperty('id', type.id);
    expect(updatedType).toHaveProperty('name', 'Storage');
    expect(updatedType).toHaveProperty('maxBookingDuration', 60);
  });

  it('should not update a non-existing type', async () => {
    expect.assertions(1);
    const update = {
      name: 'Storage',
      maxBookingDuration: 60,
    };
    return TypeService.updateType(nonExistingTypeId, update).catch((e) => {
      expect(e.message).toMatch(`Type ${nonExistingTypeId} not found`);
    });
  });

  it('should remove an existing type', async () => {
    const type = await createType();
    const removedType = await TypeService.deleteType(type.id, randomObjectId, new Date());
    expect(removedType).toHaveProperty('removedBy');
    expect(removedType).toHaveProperty('removedAt');
  });
});
