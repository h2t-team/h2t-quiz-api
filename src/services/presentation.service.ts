import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { generate } from 'referral-codes';

const getPresentationById = (id: string) => {
  return models.Presentation.findByPk(id, {
    raw: true,
    attributes: ['id', 'name', 'inviteCode', 'isPresent', 'groupId'],
    include: [
      {
        model: models.Group,
        as: 'group',
        attributes: ['name'],
      },
    ],
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

const getPresentationByCode = (inviteCode: string) => {
  return models.Presentation.findOne({
    raw: true,
    where: {
      inviteCode,
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

const getQuestionListByPresentationId = (id: string) => {
  return models.QuestionInPresentation.findAll({
    raw: true,
    where: {
      presentationId: id,
    },
  });
};

export {
  getPresentationById,
  getPresentationByUser,
  getPresentationByGroup,
  getPresentationByCode,
  createPresentation,
  updatePresentation,
  updatePresentationStatus,
  getQuestionListByPresentationId,
};
