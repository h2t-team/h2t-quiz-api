import { Op } from 'sequelize';
import { models } from '../models';

interface UpdateOption {
  option?: string;
  amount?: number;
}

const getSlideInPresentation = (presentId: string) => {
  return models.Slide.findAll({
    where: {
      presentId,
    },
    attributes: ['id', 'title', 'index'],
    include: [
      {
        model: models.PollSlide,
        as: 'pollSlides',
        required: true,
        attributes: ['id', 'option', 'amount'],
      },
    ],
  });
};

const getOneSlideInPresentation = (presentId: string, slideId: number) => {
  return models.Slide.findOne({
    where: {
      presentId,
      id: slideId,
    },
    attributes: ['id', 'title', 'index'],
    include: [
      {
        model: models.PollSlide,
        as: 'pollSlides',
        required: true,
        attributes: ['id', 'option', 'amount'],
      },
    ],
  });
};

const getOptionAmountById = (optionId: number) => {
  return models.PollSlide.findByPk(optionId, {
    raw: true,
    attributes: ['amount'],
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

const addOptionToSlide = (slideId: number, option: string) => {
  return models.PollSlide.create({
    slideId,
    option,
    amount: 0,
  });
};

const updateOptionInfo = (
  optionId: number,
  option: string | undefined,
  amount: number | undefined,
) => {
  const updateOption: UpdateOption = {};

  if (option) {
    updateOption.option = option;
  }
  if (amount) {
    updateOption.amount = amount;
  }

  return models.PollSlide.update(updateOption, {
    where: {
      id: optionId,
    },
  });
};

const deleteOptionFromSlide = (optionId: number) => {
  return models.PollSlide.destroy({
    where: {
      id: optionId,
    },
  });
};

export {
  getSlideInPresentation,
  getOptionAmountById,
  createSlide,
  deleteSlide,
  addOptionToSlide,
  updateOptionInfo,
  deleteOptionFromSlide,
  getOneSlideInPresentation,
};
