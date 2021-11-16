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
  return Thing.find().sort({ name: 1, descripton: -1 }).exec();
}

function updateThing(
  thingId: string,
  update: Partial<ThingDocument>,
): Promise<ThingDocument | null> {
  return Thing.findByIdAndUpdate(thingId, update, { new: true })
    .exec()
    .then((thing) => {
      if (!thing) {
        throw new Error(`Thing ${thingId} not found`);
      }
      return thing;
    });
}

function deleteThing(thingId: string): Promise<ThingDocument | null> {
  return Thing.findByIdAndDelete(thingId)
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
