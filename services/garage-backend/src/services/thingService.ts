/*
import Thing from 'src/models/Thing';
import { ThingDocument } from 'src/models/Thing/';

function create(thing: ThingDocument): Promise<ThingDocument> {
  return thing.save();
}

function findById(thingId: string): Promise<ThingDocument> {
  return Thing.findById(thingId)
    .exec()
    .then((thing) => {
      if (!thing) {
        throw new Error(`Thing ${thingId} not found`);
      }
      return thing;
    });
}

function findAll(): Promise<ThingDocument[]> {
  return Thing.find().sort({ name: 1, descripton: -1 }).exec();
}
*/
