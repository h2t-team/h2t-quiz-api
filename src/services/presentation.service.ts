import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { generate } from 'referral-codes';
const getPresentationById = (id: string) => {
  return models.Presentation.findByPk(id, {
    raw: true,
    attributes: ['id', 'name', 'inviteCode'],
  });
};

const getPresentationByUser = (userId: string) => {
  return models.Presentation.findAll({
    raw: true,
    where: {
      userId,
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

const createPresentation = (name: string, userId: string) => {
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

export {
  getPresentationById,
  getPresentationByUser,
  getPresentationByCode,
  createPresentation,
  updatePresentation,
};
