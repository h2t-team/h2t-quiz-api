var DataTypes = require('sequelize').DataTypes;
var _Group = require('./group');
var _User = require('./user');
var _UserInGroup = require('./userInGroup');

function initModels(sequelize) {
  var Group = _Group(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserInGroup = _UserInGroup(sequelize, DataTypes);

  UserInGroup.belongsTo(Group, { as: 'group', foreignKey: 'groupId' });
  Group.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'groupId' });
  Group.belongsTo(User, { as: 'idUser', foreignKey: 'id' });
  User.hasOne(Group, { as: 'group', foreignKey: 'id' });
  UserInGroup.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'userId' });

  return {
    Group,
    User,
    UserInGroup,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
