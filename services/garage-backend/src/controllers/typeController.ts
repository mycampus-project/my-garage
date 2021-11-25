import { Request, Response, NextFunction } from 'express';

import Type from '../models/Type';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError';
import TypeService from '../services/typeService';
import { serializeType } from '../serializers/types';

// POST /types
export const createType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const typeDocument = await Type.findOne({ name: req.body.name });
    if (typeDocument) {
      next(new BadRequestError('Type already exists in Database'));
      return;
    }
    const type = new Type({
      name,
      createdBy: req.user,
    });
    await TypeService.createType(type);
    res.status(201).send(await serializeType(type));
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Request Not Valid', error));
    } else {
      next(new InternalServerError('Internal Server Error'));
    }
  }
};

// GET /types
export const findAllTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const typeDocuments = await TypeService.findAllTypes();
    const arrayOfTypes = await Promise.all(typeDocuments.map((item) => serializeType(item)));
    res.send(arrayOfTypes);
  } catch (error: any) {
    next(new InternalServerError(error.message, error));
  }
};

// GET /types/:typeId
export const findTypeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonType = await TypeService.findTypeById(req.params.typeId);
    res.send(await serializeType(jsonType));
  } catch (error: any) {
    next(new NotFoundError('Type not found', error));
  }
};

// PUT /type/:typeId
export const updateType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const typeDocument = await Type.findOne({ name: req.body.name });
    if (typeDocument) {
      next(new BadRequestError('Type already exists in Database'));
      return;
    }
    const update = {
      name,
    };
    const { typeId } = req.params;
    const updatedType = await TypeService.updateType(typeId, update);
    res.json(await serializeType(updatedType));
  } catch (error: any) {
    next(new NotFoundError('Type not found', error));
  }
};

// DELETE /type/:typeId

export const deleteType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { typeId } = req.params;
    const jsonType = await TypeService.findTypeById(typeId);

    if (jsonType.removedBy != null && jsonType.removedAt != null) {
      res.send('Type already deleted');
      return;
    }
    const deletedType = await TypeService.deleteType(typeId, req.user.id, new Date());
    res.json(await serializeType(deletedType));
  } catch (error: any) {
    next(new NotFoundError('Type not found', error));
  }
};

export const restoreType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { typeId } = req.params;
    const jsonType = await TypeService.findTypeById(typeId);
    if (jsonType.removedBy === null && jsonType.removedAt === null) {
      res.send('Type is not deleted');
      return;
    }
    jsonType.removedBy = undefined;
    jsonType.removedAt = undefined;
    await jsonType.save();
    res.json(await serializeType(jsonType));
  } catch (error: any) {
    next(new NotFoundError('Type not found', error));
  }
};
