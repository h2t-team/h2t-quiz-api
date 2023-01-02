import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { UserInGroupAttributes } from 'models/userInGroup';
import { Op } from 'sequelize';
import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { Group } from 'models/group';

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
      role: {
        [Op.ne]: 'kick out',
      },
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
        where: {
          role: {
            [Op.ne]: 'kick out',
          },
        },
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

const findUserInGroup = (groupId = '', userId = '') => {
  return models.UserInGroup.findOne({
    raw: true,
    where: {
      [Op.and]: [{ groupId }, { userId }],
    },
  });
};

const sendInvitationEmail = async (email: string, group: Group) => {
  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, '../templates/'),
      layoutsDir: path.join(__dirname, '../templates/'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../templates/'),
    extName: '.hbs',
  };

  const transporter = await nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.use('compile', hbs(hbsConfig));

  const link = `${process.env.CLIENT_URL}/groups/invite/${group.id}`;
  const title = 'Invitation to join the group!';
  const description = `You have been invited to join ${group.name}. To accept the invitaion and get started, click on the button below:`;
  const button = 'Accept this invitation';
  const data = { email, link, title, description, button };

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Invitation Email - H2T',
    template: 'emailTemplate',
    context: data,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw Error('Send activation mail fail');
  }
};

export {
  findGroupsByUser,
  findGroupById,
  createGroup,
  addUsersToGroup,
  setUserRoleInGroup,
  findUserInGroup,
  sendInvitationEmail,
};
