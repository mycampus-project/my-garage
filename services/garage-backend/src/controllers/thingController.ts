import { Request, Response, NextFunction } from 'express';

import Thing from '../models/Thing';
import { BadRequestError, InternalServerError, NotFoundError } from '../helpers/apiError';
import ThingService from '../services/thingService';

// POST /things
export const createThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, type, isAvailable, removedAt, removedBy } = req.body;
    const thing = new Thing({
      name,
      description,
      type,
      createdBy: req.user,
      isAvailable,
      removedAt,
      removedBy,
    });

    await ThingService.createThing(thing);
    res.json(thing);
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
    res.json(await ThingService.findAllThings());
  } catch (error: any) {
    next(new NotFoundError('Things not found', error));
  }
};

// GET /things/:thingId
export const findThingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await ThingService.findThingById(req.params.thingId));
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};

// PUT /things/:thingId
export const updateThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body;
    const { thingId } = req.params;
    const updatedThing = await ThingService.updateThing(thingId, update);
    res.json(updatedThing);
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};

// DELETE /things/:thingId
export const deleteThing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ThingService.deleteThing(req.params.thingId);
    res.status(204).end();
  } catch (error: any) {
    next(new NotFoundError('Thing not found', error));
  }
};
