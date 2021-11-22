import { Request, Response, NextFunction } from 'express';

import Thing from '../models/Thing';
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
    if (!req.file) {
      next(new BadRequestError('file is required'));
      return;
    }
    const { name, description, type, isAvailable } = req.body;
    const thing = new Thing({
      name,
      description,
      type,
      createdBy: req.user,
      isAvailable,
      image: { dataUrl: req.file.path },
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
    const update = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      isAvailable: req.body.isAvailable,
    };
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
