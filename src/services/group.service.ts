import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';

const findGroupsByUser = (userId = '') => {
  return models.UserInGroup.findAll({
    where: {
      userId: userId,
    },
  });
};

const findGroupById = (groupId = '') => {
  return models.Group.findByPk(groupId);
};

const createGroup = (userId: string, groupName: string) => {
  return models.Group.create({
    id: uuidv4(),
    name: groupName,
    owner: userId,
  });
};

const addUsersToGroup = (groupId: string, userIdList: string[]) => {
  const usersInGroup = userIdList.map((userId: string) => ({
    userId,
    groupId,
  }));

  return models.UserInGroup.bulkCreate(usersInGroup);
};

export { findGroupsByUser, findGroupById, createGroup, addUsersToGroup };
