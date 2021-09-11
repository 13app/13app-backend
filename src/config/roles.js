const allRoles = {
  user: ['getMe', 'manageMe'],
  admin: ['getMe', 'manageMe', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
