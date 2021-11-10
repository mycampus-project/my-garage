import Role from '../models/Role';

const createRoles = async () => {
  const areThereAnyRoles = (await Role.count()) > 0;

  if (areThereAnyRoles) return;

  const userRole = new Role({
    name: 'user',
  });
  const adminRole = new Role({
    name: 'admin',
  });

  await userRole.save();
  await adminRole.save();
};

export default createRoles;
