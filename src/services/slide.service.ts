import { Op } from 'sequelize';
import { models } from '../models';

const getSlideInPresentation = (presentId: string) => {
  return models.Slide.findAll({
    where: {
      presentId,
    },
    attributes: ['title', 'index'],
  });
};

const createSlide = (presentId: string, title: string, index = 0) => {
  return models.Slide.create({
    presentId,
    title,
    index,
  });
};

const deleteSlide = (presentId: string, index: number) => {
  return models.Slide.destroy({
    where: {
      [Op.and]: [{ presentId }, { index }],
    },
  });
};

export { getSlideInPresentation, createSlide, deleteSlide };
