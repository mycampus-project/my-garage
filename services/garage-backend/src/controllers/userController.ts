import { Request, Response, NextFunction } from 'express';

import userService from '../services/userService';
import { serializeUser } from '../serializers/users';
import { NotFoundError } from '../helpers/apiError';

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDocument = await userService.findAllUser();
    const arrayOfUsers = await Promise.all(userDocument.map((item) => serializeUser(item)));
    res.send(arrayOfUsers);
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const findUserByid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonUser = await userService.findUserById(req.params.userId);
    res.json(await serializeUser(jsonUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = {
      role: req.body.role,
    };
    const { userId } = req.params;
    const updatedUser = await userService.updateUser(userId, update);
    res.json(await serializeUser(updatedUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = {
      removedBy: req.body.removedBy,
      removedAt: new Date(),
    };
    const { userId } = req.params;
    const removedUser = await userService.updateUser(userId, update);
    res.json(await serializeUser(removedUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};
