import Role from '../models/Role';

const createRoles = async () => {
  const areThereAnyRoles = (await Role.count()) > 0;

  if (areThereAnyRoles) return;

  await new Role({
    name: 'user',
  }).save();
  await new Role({
    name: 'admin',
  }).save();
};

export default createRoles;
