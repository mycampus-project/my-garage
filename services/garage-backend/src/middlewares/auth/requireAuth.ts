import { Handler } from 'express';

import Role from '../../models/Role';
import { UserDocument } from '../../models/User';

const checkRole = async (user: UserDocument, role?: string) => {
  if (!role) return true;

  const userWithRole = await user.populate<{ role: typeof Role }>({ path: 'role', model: Role });

  return userWithRole.role.name === role;
};

const requireAuth =
  (role?: string): Handler =>
  async (req, res, next) => {
    const { user } = req;

    let isUserValid = false;
    try {
      if (role && user) {
        isUserValid = await checkRole(user, role);
      } else if (user) {
        isUserValid = true;
      }
    } catch {
      isUserValid = false;
    }

    if (isUserValid) {
      next();
    } else {
      res.status(401).send({
        errors: [
          {
            message: 'Authentication required',
          },
        ],
      });
    }
  };

export default requireAuth;
