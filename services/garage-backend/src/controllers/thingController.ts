import { Request, Response, NextFunction } from 'express';

import User from '../models/User';
import Thing from '../models/Thing';
import Type from '../models/Type';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError';
import ThingService from '../services/thingService';
import { serializeThing } from '../serializers/things';

// POST /things
export const createThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(await Thing.exists({ name: req.body.name }))) {
      next(new BadRequestError('Thing with same name exists in the Database'));
      return;
    }
    const typeDocument = await Type.findOne({ name: req.body.type });
    if (!typeDocument) {
      next(new BadRequestError('Type is not found in database'));
      return;
    }

    const { name, description, isAvailable, contactPerson } = req.body;
    if (!(await User.exists({ _id: contactPerson }))) {
      next(new BadRequestError(`User with id ${contactPerson} could not be found`));
      return;
    }

    const thing = new Thing({
      name,
      description,
      type: typeDocument.id,
      createdBy: req.user,
      isAvailable,
      imageUrl: req.file?.filename,
      contactPerson,
    });

    await ThingService.createThing(thing);
    res.status(201).send(await serializeThing(thing));
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Request Not Valid', error));
    } else {
      next(new InternalServerError('Internal Server Error'));
    }
  }
};

// GET /things
export const findAllThings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const thingDocuments = await ThingService.findAllThings();
    const arrayOfThings = await Promise.all(thingDocuments.map((item) => serializeThing(item)));
    res.send(arrayOfThings);
  } catch (error: any) {
    next(new InternalServerError(error.message, error));
  }
};

// GET /things/:thingId
export const findThingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonThing = await ThingService.findThingById(req.params.thingId);
    res.json(await serializeThing(jsonThing));
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};

// PUT /things/:thingId
export const updateThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, name, description, isAvailable, contactPerson } = req.body;

    if (name && !(await Thing.exists({ name, _id: { $not: { $eq: req.params.thingId } } }))) {
      next(new BadRequestError('Thing with same name exists in the Database'));
      return;
    }
    if (contactPerson && !(await User.exists({ _id: contactPerson }))) {
      next(new BadRequestError(`User with id ${contactPerson} could not be found`));
      return;
    }
    const typeDocument = type && (await Type.findOne({ name: req.body.type }));
    if (type && !typeDocument) {
      next(new BadRequestError('Thing is not found in database'));
      return;
    }
    const update = Object.fromEntries(
      Object.entries({
        name,
        description,
        type: typeDocument?.id,
        isAvailable,
        imageUrl: req.file?.filename,
        contactPerson,
      }).filter(([, value]) => value !== undefined || value !== null),
    );
    const { thingId } = req.params;
    const updatedThing = await ThingService.updateThing(thingId, update);
    res.json(await serializeThing(updatedThing));
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};

// DELETE /things/:thingId

export const deleteThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { thingId } = req.params;
    const jsonThing = await ThingService.findThingById(thingId);
    if (jsonThing.removedBy != null && jsonThing.removedAt != null) {
      res.send('Thing already deleted');
      return;
    }
    const deletedThing = await ThingService.deleteThing(thingId, req.user.id, new Date());
    res.json(await serializeThing(deletedThing));
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};

export const restoreThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { thingId } = req.params;
    const jsonThing = await ThingService.findThingById(thingId);
    if (jsonThing.removedBy === null && jsonThing.removedAt === null) {
      res.send('Thing is not deleted');
      return;
    }
    jsonThing.removedBy = undefined;
    jsonThing.removedAt = undefined;
    await jsonThing.save();
    res.json(await serializeThing(jsonThing));
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};
