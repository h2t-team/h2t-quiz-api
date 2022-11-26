import type { Sequelize } from 'sequelize';
import { Group as _Group } from './group';
import type { GroupAttributes, GroupCreationAttributes } from './group';
import { User as _User } from './user';
import type { UserAttributes, UserCreationAttributes } from './user';
import { UserInGroup as _UserInGroup } from './userInGroup';
import type {
  UserInGroupAttributes,
  UserInGroupCreationAttributes,
} from './userInGroup';

export { _Group as Group, _User as User, _UserInGroup as UserInGroup };

export type {
  GroupAttributes,
  GroupCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserInGroupAttributes,
  UserInGroupCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Group = _Group.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UserInGroup = _UserInGroup.initModel(sequelize);

  UserInGroup.belongsTo(Group, { as: 'group', foreignKey: 'groupId' });
  Group.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'groupId' });
  Group.belongsTo(User, { as: 'ownerUser', foreignKey: 'owner' });
  User.hasMany(Group, { as: 'groups', foreignKey: 'owner' });
  UserInGroup.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'userId' });

  return {
    Group: Group,
    User: User,
    UserInGroup: UserInGroup,
  };
}
