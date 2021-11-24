import { Request, Response, NextFunction } from 'express';

import { BadRequestError, NotFoundError, UnauthorizedError } from '../helpers/apiError';
import UserService from '../services/userService';
import { serializeUser } from '../serializers/users';
import Role from '../models/Role';

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDocument = await UserService.findAllUser();
    const arrayOfUsers = await Promise.all(userDocument.map((item) => serializeUser(item)));
    res.send(arrayOfUsers);
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const findUserByid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jsonUser = await UserService.findUserById(req.params.userId);
    res.json(await serializeUser(jsonUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleDocument = await Role.findOne({ name: req.body.role });
    if (!roleDocument) {
      next(new BadRequestError('Role not found'));
      return;
    }
    const update = {
      // eslint-disable-next-line no-underscore-dangle
      role: roleDocument._id,
    };
    const { userId } = req.params;
    const updatedUser = await UserService.updateUser(userId, update);
    res.json(await serializeUser(updatedUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { userId } = req.params;
    const jsonUser = await UserService.findUserById(userId);
    if (jsonUser.removedBy != null && jsonUser.removedAt != null) {
      res.send('User is already deleted');
      return;
    }
    const removedUser = await UserService.deleteUser(userId, req.user.id, new Date());
    res.json(await serializeUser(removedUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};

export const restoreUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      next(new UnauthorizedError('User not found'));
      return;
    }

    const { userId } = req.params;
    const jsonUser = await UserService.findUserById(userId);
    if (jsonUser.removedBy === null && jsonUser.removedAt === null) {
      res.send('User is not deleted');
      return;
    }
    jsonUser.removedBy = undefined;
    jsonUser.removedAt = undefined;
    await jsonUser.save();
    res.json(await serializeUser(jsonUser));
  } catch (error: any) {
    next(new NotFoundError('User not found', error));
  }
};
