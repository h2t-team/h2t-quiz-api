import type { Sequelize } from 'sequelize';
import { Group as _Group } from './group';
import type { GroupAttributes, GroupCreationAttributes } from './group';
import { PollSlide as _PollSlide } from './pollSlide';
import type {
  PollSlideAttributes,
  PollSlideCreationAttributes,
} from './pollSlide';
import { Presentation as _Presentation } from './presentation';
import type {
  PresentationAttributes,
  PresentationCreationAttributes,
} from './presentation';
import { Slide as _Slide } from './slide';
import type { SlideAttributes, SlideCreationAttributes } from './slide';
import { User as _User } from './user';
import type { UserAttributes, UserCreationAttributes } from './user';
import { UserInGroup as _UserInGroup } from './userInGroup';
import type {
  UserInGroupAttributes,
  UserInGroupCreationAttributes,
} from './userInGroup';

export {
  _Group as Group,
  _PollSlide as PollSlide,
  _Presentation as Presentation,
  _Slide as Slide,
  _User as User,
  _UserInGroup as UserInGroup,
};

export type {
  GroupAttributes,
  GroupCreationAttributes,
  PollSlideAttributes,
  PollSlideCreationAttributes,
  PresentationAttributes,
  PresentationCreationAttributes,
  SlideAttributes,
  SlideCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserInGroupAttributes,
  UserInGroupCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Group = _Group.initModel(sequelize);
  const PollSlide = _PollSlide.initModel(sequelize);
  const Presentation = _Presentation.initModel(sequelize);
  const Slide = _Slide.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UserInGroup = _UserInGroup.initModel(sequelize);

  UserInGroup.belongsTo(Group, { as: 'group', foreignKey: 'groupId' });
  Group.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'groupId' });
  Slide.belongsTo(Presentation, { as: 'present', foreignKey: 'presentId' });
  Presentation.hasMany(Slide, { as: 'slides', foreignKey: 'presentId' });
  PollSlide.belongsTo(Slide, { as: 'slide', foreignKey: 'slideId' });
  Slide.hasMany(PollSlide, { as: 'pollSlides', foreignKey: 'slideId' });
  Group.belongsTo(User, { as: 'ownerUser', foreignKey: 'owner' });
  User.hasMany(Group, { as: 'groups', foreignKey: 'owner' });
  Presentation.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(Presentation, { as: 'presentations', foreignKey: 'userId' });
  UserInGroup.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  User.hasMany(UserInGroup, { as: 'userInGroups', foreignKey: 'userId' });

  return {
    Group: Group,
    PollSlide: PollSlide,
    Presentation: Presentation,
    Slide: Slide,
    User: User,
    UserInGroup: UserInGroup,
  };
}
