import Thing from '../../src/models/Thing';

import ThingService from '../../src/services/thingService';
import db from '../db';

const nonExistingThingId = '73y46723gredewysdb6324243';

async function createThing() {
  const thing = new Thing({
    name: 'Hp Probook',
    description: 'Lapotop computer',
    type: 'compute',
    isAvailable: 'true',
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
  });
  return await ThingService.createThing(thing);
}

describe('thing service', () => {
  beforeEach(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  it('should create a thing', async () => {
    const thing = await createThing();
    expect(thing).toHaveProperty('_id');
    expect(thing).toHaveProperty('name', 'Hp Probook');
    expect(thing).toHaveProperty('description', 'Lapotop computer');
    expect(thing).toHaveProperty('type', 'compute');
    expect(thing).toHaveProperty('isAvailable', 'true');
    expect(thing).toHaveProperty('imageUrl', 'https://randomuser.me/api/portraits/men/22.jpg');
  });

  it('should get a thing with id', async () => {
    const thing = await createThing();
    const found = await ThingService.findThingById(thing.id);
    expect(found.name).toEqual(thing.name);
    expect(found.description).toEqual(thing.description);
    expect(found.type).toEqual(thing.type);
    expect(found.isAvailable).toEqual(thing.isAvailable);
    expect(found.imageUrl).toEqual(thing.imageUrl);
  });

  it('should not get a non existing thing', async () => {
    expect.assertions(1);
    return ThingService.findThingById(nonExistingThingId).catch((e) => {
      expect(e.message).toMatch(`Thing ${nonExistingThingId} not found`);
    });
  });

  it('should update an existing thing', async () => {
    const thing = await createThing();
    const update = {
      name: 'Hp Elitebook',
      description: 'Better computer',
      type: 'Computer',
      isAvailable: false,
      imageId: 'https://randomuser.me/api/portraits/men/17.jpg',
    };
    const updatedThing = await ThingService.updateThing(thing.id, update);
    expect(updatedThing).toHaveProperty('id', thing.id);
    expect(updatedThing).toHaveProperty('name', 'Hp Elitebook');
    expect(updatedThing).toHaveProperty('description', 'Better computer');
    expect(updatedThing).toHaveProperty('type', 'Computer');
    expect(updatedThing).toHaveProperty(
      'imageId',
      'https://randomuser.me/api/portraits/men/17.jpg',
    );
  });

  it('should not update a non-existing thing', async () => {
    expect.assertions(1);
    const update = {
      name: 'Hp Elitebook',
      description: 'Better computer',
      type: 'Computer',
      isAvailable: false,
      imageId: 'https://randomuser.me/api/portraits/men/17.jpg',
    };
    return ThingService.updateThing(nonExistingThingId, update).catch((e) => {
      expect(e.message).toMatch(`Thing ${nonExistingThingId} not found`);
    });
  });

  // it('should delete an existing thing', async()=>{
  //   expect.assertions(1);
  //   const thing = await createThing();
  //   await ThingService.deleteThing(thing.id);

  // })
});
