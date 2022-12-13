import { models } from '../models';
import { v4 as uuidv4 } from 'uuid';

const getPresentationById = (id: string) => {
  return models.Presentation.findByPk(id, {
    raw: true,
    attributes: ['id', 'name'],
  });
};

const getPresentationByUser = (userId: string) => {
  return models.Presentation.findAll({
    raw: true,
    where: {
      userId,
    },
  });
};

const createPresentation = (name: string, userId: string) => {
  return models.Presentation.create({
    id: uuidv4(),
    name,
    userId,
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
  createPresentation,
  updatePresentation,
};
