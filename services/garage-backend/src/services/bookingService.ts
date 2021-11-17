import { ObjectId } from 'mongoose';

import Booking, { BookingDocument } from '../models/Booking';

function createBooking(thing: BookingDocument): Promise<BookingDocument> {
  return thing.save();
}

function findBookingById(bookingId: string): Promise<BookingDocument> {
  return Booking.findById(bookingId)
    .exec()
    .then((booking) => {
      if (!booking) {
        throw new Error(`Booking ${bookingId} not found`);
      }
      return booking;
    });
}

function findAllThings(): Promise<ThingDocument[]> {
  return Thing.find().sort({ name: 1, descripton: -1 }).exec();
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
  removedBy: ObjectId,
  removedAt: Date,
): Promise<ThingDocument> {
  if (removedBy != null && removedAt != null) {
    throw new Error('Item is already removed');
  }
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
