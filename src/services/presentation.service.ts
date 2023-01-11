import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { generate } from 'referral-codes';
import { Op } from 'sequelize';

const getPresentationById = (id: string) => {
  return models.Presentation.findOne({
    raw: true,
    attributes: ['id', 'name', 'inviteCode', 'isPresent', 'groupId'],
    include: [
      {
        model: models.Group,
        as: 'group',
        attributes: ['name'],
      },
    ],
    where: {
      id: id,
      isDelete: false,
    },
  });
};

const getPresentationByUser = (userId: string) => {
  return models.Presentation.findAll({
    raw: true,
    where: {
      userId,
      isDelete: false,
    },
    include: [
      {
        model: models.Group,
        as: 'group',
        attributes: ['name'],
      },
    ],
  });
};

const getPresentationByGroup = (groupId: string) => {
  return models.Presentation.findAll({
    raw: true,
    where: {
      groupId,
      isDelete: false,
    },
  });
};

const getPresentingInGroup = (groupId: string) => {
  return models.Presentation.findOne({
    raw: true,
    where: {
      groupId,
      isPresent: true,
      isDelete: false,
    },
  });
};

const getPresentationByCode = (inviteCode: string) => {
  return models.Presentation.findOne({
    raw: true,
    where: {
      inviteCode,
      isDelete: false,
    },
  });
};

const createPresentation = (name: string, userId: string, groupId?: string) => {
  const inviteCode = generate({
    length: 6,
    count: 1,
    charset: '0123456789',
  })[0];

  return models.Presentation.create({
    id: uuidv4(),
    name,
    userId,
    inviteCode,
    isDelete: false,
    isPresent: false,
    groupId,
  });
};

const updatePresentation = (id: string, name: string) => {
  return models.Presentation.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    },
  );
};

const updatePresentationStatus = (id: string, isPresent: boolean) => {
  return models.Presentation.update(
    {
      isPresent,
    },
    {
      where: {
        id,
      },
    },
  );
};

const disableAllPresentation = (groupId: string, presentId: string) => {
  return models.Presentation.update(
    {
      isPresent: false,
    },
    {
      where: {
        [Op.and]: [
          {
            groupId,
          },
          {
            [Op.not]: {
              id: presentId,
            },
          },
        ],
      },
    },
  );
};

const getQuestionListByPresentationId = (id: string) => {
  return models.QuestionInPresentation.findAll({
    raw: true,
    where: {
      presentationId: id,
    },
  });
};

const deletePresentation = (presentationId: string) => {
  return models.Presentation.update(
    {
      isDelete: true,
    },
    {
      where: {
        id: presentationId,
      },
    },
  );
};

export {
  getPresentationById,
  getPresentationByUser,
  getPresentationByGroup,
  getPresentingInGroup,
  getPresentationByCode,
  createPresentation,
  updatePresentation,
  updatePresentationStatus,
  disableAllPresentation,
  getQuestionListByPresentationId,
  deletePresentation,
};
