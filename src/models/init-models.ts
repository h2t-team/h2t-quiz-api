import type { Sequelize } from 'sequelize';
import { group as _group } from './group';
import type { groupAttributes, groupCreationAttributes } from './group';
import { pollSlide as _pollSlide } from './pollSlide';
import type {
  pollSlideAttributes,
  pollSlideCreationAttributes,
} from './pollSlide';
import { presentation as _presentation } from './presentation';
import type {
  presentationAttributes,
  presentationCreationAttributes,
} from './presentation';
import { slide as _slide } from './slide';
import type { slideAttributes, slideCreationAttributes } from './slide';
import { user as _user } from './user';
import type { userAttributes, userCreationAttributes } from './user';
import { userInGroup as _userInGroup } from './userInGroup';
import type {
  userInGroupAttributes,
  userInGroupCreationAttributes,
} from './userInGroup';

export {
  _group as group,
  _pollSlide as pollSlide,
  _presentation as presentation,
  _slide as slide,
  _user as user,
  _userInGroup as userInGroup,
};

export type {
  groupAttributes,
  groupCreationAttributes,
  pollSlideAttributes,
  pollSlideCreationAttributes,
  presentationAttributes,
  presentationCreationAttributes,
  slideAttributes,
  slideCreationAttributes,
  userAttributes,
  userCreationAttributes,
  userInGroupAttributes,
  userInGroupCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const group = _group.initModel(sequelize);
  const pollSlide = _pollSlide.initModel(sequelize);
  const presentation = _presentation.initModel(sequelize);
  const slide = _slide.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const userInGroup = _userInGroup.initModel(sequelize);

  userInGroup.belongsTo(group, { as: 'group', foreignKey: 'groupId' });
  group.hasMany(userInGroup, { as: 'userInGroups', foreignKey: 'groupId' });
  slide.belongsTo(presentation, { as: 'present', foreignKey: 'presentId' });
  presentation.hasMany(slide, { as: 'slides', foreignKey: 'presentId' });
  pollSlide.belongsTo(slide, { as: 'slide', foreignKey: 'slideId' });
  slide.hasMany(pollSlide, { as: 'pollSlides', foreignKey: 'slideId' });
  group.belongsTo(user, { as: 'ownerUser', foreignKey: 'owner' });
  user.hasMany(group, { as: 'groups', foreignKey: 'owner' });
  presentation.belongsTo(user, { as: 'user', foreignKey: 'userId' });
  user.hasMany(presentation, { as: 'presentations', foreignKey: 'userId' });
  userInGroup.belongsTo(user, { as: 'user', foreignKey: 'userId' });
  user.hasMany(userInGroup, { as: 'userInGroups', foreignKey: 'userId' });

  return {
    group: group,
    pollSlide: pollSlide,
    presentation: presentation,
    slide: slide,
    user: user,
    userInGroup: userInGroup,
  };
}
