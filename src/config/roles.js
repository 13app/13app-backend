const allRoles = {
  user: ['getMe', 'manageMe', 'joinPool'],
  admin: ['getMe', 'manageMe', 'joinPool', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
