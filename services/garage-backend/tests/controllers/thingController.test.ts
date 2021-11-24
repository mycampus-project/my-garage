import request from 'supertest';

import Thing, { ThingDocument } from '../../src/models/Thing';
import app from '../../src/index';
import db from '../db';

const nonExistingThingId = 'njfdjashfhwe23ndsnf';

async function createThing(override?: Partial<ThingDocument>) {
  let thing = {
    name: 'Hp Probook',
    description: 'Lapotop computer',
    type: 'compute',
    isAvailable: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
  };

  if (override) {
    thing = { ...thing, ...override };
  }

  return await request(app).post('/thing').send(thing);
}
