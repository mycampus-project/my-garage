import { Types } from 'mongoose';

import Thing, { ThingDocument } from '../models/Thing';

function createThing(thing: ThingDocument): Promise<ThingDocument> {
  return thing.save();
}

function findThingById(thingId: string): Promise<ThingDocument> {
  return Thing.findById(thingId)
    .exec()
    .then((thing) => {
      if (!thing) {
        throw new Error(`Thing ${thingId} not found`);
      }
      return thing;
    });
}

function findAllThings(): Promise<ThingDocument[]> {
  return Thing.find().exec();
}

function updateThing(thingId: string, update: Partial<ThingDocument>): Promise<ThingDocument> {
  return Thing.findByIdAndUpdate(thingId, update, { new: true })
    .exec()
    .then((thing) => {
      if (!thing) {
        throw new Error(`Thing ${thingId} not found`);
      }
      return thing;
    });
}

function deleteThing(
  thingId: string,
  removedBy: Types.ObjectId,
  removedAt: Date,
): Promise<ThingDocument> {
  const update: Partial<ThingDocument> = { removedAt, removedBy };
  return Thing.findByIdAndUpdate(thingId, update, { new: true })
    .exec()
    .then((thing) => {
      if (!thing) {
        throw new Error(`Thing ${thingId} not found`);
      }
      return thing;
    });
}

export default {
  createThing,
  findThingById,
  findAllThings,
  updateThing,
  deleteThing,
};
