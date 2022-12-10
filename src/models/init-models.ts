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

  UserInGroup.belongsTo(Group, { as: 'Group', foreignKey: 'GroupId' });
  Group.hasMany(UserInGroup, { as: 'UserInGroups', foreignKey: 'GroupId' });
  Slide.belongsTo(Presentation, { as: 'Present', foreignKey: 'PresentId' });
  Presentation.hasMany(Slide, { as: 'Slides', foreignKey: 'PresentId' });
  PollSlide.belongsTo(Slide, { as: 'Slide', foreignKey: 'SlideId' });
  Slide.hasMany(PollSlide, { as: 'PollSlides', foreignKey: 'SlideId' });
  Group.belongsTo(User, { as: 'OwnerUser', foreignKey: 'Owner' });
  User.hasMany(Group, { as: 'Groups', foreignKey: 'Owner' });
  Presentation.belongsTo(User, { as: 'User', foreignKey: 'UserId' });
  User.hasMany(Presentation, { as: 'Presentations', foreignKey: 'UserId' });
  UserInGroup.belongsTo(User, { as: 'User', foreignKey: 'UserId' });
  User.hasMany(UserInGroup, { as: 'UserInGroups', foreignKey: 'UserId' });

  return {
    Group: Group,
    PollSlide: PollSlide,
    Presentation: Presentation,
    Slide: Slide,
    User: User,
    UserInGroup: UserInGroup,
  };
}
