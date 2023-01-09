import { Request, Response } from 'express';
import {
  addOptionToSlide,
  createSlide,
  deleteSlide,
  getSlideInPresentation,
  getOneSlideInPresentation,
  getSlidePreviewListById,
} from '../services/slide.service';
import {
  createPresentation,
  getPresentationByCode,
  getPresentationById,
  getPresentationByUser,
  getQuestionListByPresentationId,
  updatePresentation,
  updatePresentationStatus,
} from '../services/presentation.service';

const createNewPresentation = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { name, groupId } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    const presentation = await createPresentation(name, userId, groupId);
    const slide = await createSlide(presentation.id, '', 0);
    await Promise.all([
      addOptionToSlide(slide.id, 'Option 1'),
      addOptionToSlide(slide.id, 'Option 2'),
    ]);
    return res.status(200).json({
      succcess: true,
      message: 'Presentation create successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllPresentation = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  try {
    const presentations = await getPresentationByUser(userId);
    if (presentations) {
      return res.status(200).json({
        success: true,
        presentations,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getPresentationWithCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    const presentation = await getPresentationByCode(code);
    if (!presentation) {
      return res.status(404).json({
        success: false,
        message: 'Presentation does not exist',
      });
    }
    return res.status(200).json({
      succcess: true,
      presentation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getPresentationDetail = async (req: Request, res: Response) => {
  const { presentId } = req.params;
  if (!presentId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    const presentation = await getPresentationById(presentId);
    if (!presentation) {
      return res.status(404).json({
        success: false,
        message: 'Presentation does not exist',
      });
    }
    const slides = await getSlideInPresentation(presentId);
    return res.status(200).json({
      succcess: true,
      presentation,
      slides,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getDetailSlideInPresentation = async (req: Request, res: Response) => {
  const { presentId, index } = req.params;
  if (!presentId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }

  try {
    const presentation = await getPresentationById(presentId);
    if (!presentation) {
      return res.status(404).json({
        success: false,
        message: 'Presentation does not exist',
      });
    }

    if (index === 'undefined') {
      const firstSlide = await getSlideInPresentation(presentId)[0];
      return res.status(200).json({
        succcess: true,
        presentation,
        firstSlide,
      });
    }

    const slide = await getOneSlideInPresentation(presentId, Number(index));
    if (!slide) {
      return res.status(404).json({
        succcess: false,
        message: 'Slide not found',
      });
    }
    return res.status(200).json({
      succcess: true,
      presentation,
      slide,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updatePresentationInfo = async (req: Request, res: Response) => {
  const { id, name, isPresent } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    const updateList: Promise<[affectedCount: number]>[] = [];
    if (name) {
      updateList.push(updatePresentation(id, name));
    }
    if (typeof isPresent !== 'undefined') {
      updateList.push(updatePresentationStatus(id, isPresent));
    }
    await Promise.all(updateList);
    return res.status(200).json({
      succcess: true,
      message: 'Presentation update successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const addNewSlide = async (req: Request, res: Response) => {
  const { presentId, title } = req.body;
  if (!presentId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    const slides = await getSlideInPresentation(presentId);
    const index = slides.length;
    const slide = await createSlide(presentId, title, index);
    await Promise.all([
      addOptionToSlide(slide.id, 'Option 1'),
      addOptionToSlide(slide.id, 'Option 2'),
    ]);
    return res.status(200).json({
      succcess: true,
      message: 'Slide create successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const removeSlide = async (req: Request, res: Response) => {
  const { presentId, index } = req.body;
  if (!presentId || !index) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await deleteSlide(presentId, index);
    return res.status(200).json({
      succcess: true,
      message: 'Slide delete successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getSlidePreviews = async (req: Request, res: Response) => {
  const { presentId } = req.params;

  if (!presentId) {
    return res.status(400).json({
      success: false,
      message: 'Presentation not found!',
    });
  }

  try {
    const slidePreviewList = await getSlidePreviewListById(presentId);

    return res.status(200).json({
      succcess: true,
      slidePreviewList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getQuestionsInPresentation = async (req: Request, res: Response) => {
  const { presentId } = req.params;

  if (!presentId) {
    return res.status(400).json({
      success: false,
      message: 'Presentation not found!',
    });
  }

  try {
    const questionList = await getQuestionListByPresentationId(presentId);

    return res.status(200).json({
      succcess: true,
      questionList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export {
  createNewPresentation,
  getAllPresentation,
  getPresentationDetail,
  getPresentationWithCode,
  updatePresentationInfo,
  addNewSlide,
  removeSlide,
  getDetailSlideInPresentation,
  getSlidePreviews,
  getQuestionsInPresentation,
};
