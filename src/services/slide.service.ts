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
    attributes: ['id', 'title', 'index', 'type', 'paragraph'],
    include: [
      {
        model: models.PollSlide,
        as: 'pollSlides',
        required: false,
        attributes: ['id', 'option', 'amount'],
        order: [['id', 'ASC']],
      },
    ],
    order: [['index', 'ASC']],
  });
};

const getOneSlideInPresentation = (presentId: string, index: number) => {
  return models.Slide.findOne({
    where: {
      presentId,
      index,
    },
    attributes: ['id', 'title', 'index', 'paragraph', 'type'],
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

const createSlide = (
  presentId: string,
  title: string,
  index = 0,
  type: 'poll' | 'heading' | 'paragraph' = 'poll',
) => {
  return models.Slide.create({
    presentId,
    title,
    index,
    type,
  });
};

const updateSlideInfo = (slideId: number, title: string) => {
  return models.Slide.update(
    {
      title,
    },
    {
      where: {
        id: slideId,
      },
    },
  );
};

const updateSlideType = (
  slideId: number,
  type: 'poll' | 'heading' | 'paragraph',
) => {
  return models.Slide.update(
    {
      type,
    },
    {
      where: {
        id: slideId,
      },
    },
  );
};

const updateSlidePara = (slideId: number, paragraph: string) => {
  return models.Slide.update(
    {
      paragraph,
    },
    {
      where: {
        id: slideId,
      },
    },
  );
};

const deleteSlide = async (presentId: string, index: number) => {
  await models.Slide.destroy({
    where: {
      [Op.and]: [{ presentId }, { index }],
    },
  });

  return models.Slide.decrement('index', {
    by: 1,
    where: {
      index: {
        [Op.gte]: index,
      },
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

const getSlidePreviewListById = (presentationId: string) => {
  return models.Slide.findAll({
    where: {
      presentId: presentationId,
    },
    order: [['index', 'ASC']],
  });
};

export {
  getSlideInPresentation,
  getOptionAmountById,
  createSlide,
  updateSlideInfo,
  updateSlideType,
  deleteSlide,
  addOptionToSlide,
  updateOptionInfo,
  updateSlidePara,
  deleteOptionFromSlide,
  getOneSlideInPresentation,
  getSlidePreviewListById,
};
