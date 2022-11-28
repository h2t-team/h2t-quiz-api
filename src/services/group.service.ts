import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { UserInGroupAttributes } from 'models/userInGroup';

const findGroupsByUser = (userId = '') => {
  return models.UserInGroup.findAll({
    include: [
      {
        model: models.Group,
        as: 'group',
        required: true,
        attributes: ['id', 'name'],
        include: [
          {
            model: models.User,
            as: 'ownerUser',
            attributes: ['fullname'],
          },
        ],
      },
    ],
    where: {
      userId,
    },
    attributes: ['role'],
  });
};

const findGroupById = (groupId = '') => {
  return models.Group.findByPk(groupId, {
    include: [
      {
        model: models.User,
        as: 'ownerUser',
        attributes: ['fullname', 'username'],
      },
      {
        model: models.UserInGroup,
        as: 'userInGroups',
        attributes: ['userId'],
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['fullname', 'username'],
          },
        ],
      },
    ],
  });
};

const createGroup = async (userId: string, groupName: string) => {
  const group = await models.Group.create({
    id: uuidv4(),
    name: groupName,
    owner: userId,
  });
  return await models.UserInGroup.create({
    groupId: group.id,
    userId: group.owner,
    role: 'owner',
  });
};

const addUsersToGroup = (groupId: string, userIdList: string[]) => {
  const usersInGroup: Omit<UserInGroupAttributes, 'id'>[] = userIdList.map(
    (userId: string) => ({
      userId,
      groupId,
      role: 'member',
    }),
  );

  return models.UserInGroup.bulkCreate(usersInGroup);
};

const setUserRoleInGroup = (
  groupId: string,
  userId: string,
  role: 'owner' | 'co-owner' | 'member' | 'kick out',
) => {
  return models.UserInGroup.update(
    {
      role: role,
    },
    {
      where: {
        groupId,
        userId,
      },
    },
  );
};

export {
  findGroupsByUser,
  findGroupById,
  createGroup,
  addUsersToGroup,
  setUserRoleInGroup,
};
