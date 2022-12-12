import { Request, Response } from 'express';
import {
  addOptionToSlide,
  createSlide,
  deleteSlide,
  getSlideInPresentation,
} from '../services/slide.service';
import {
  createPresentation,
  getPresentationById,
  getPresentationByUser,
  updatePresentation,
} from '../services/presentation.service';

const createNewPresentation = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await createPresentation(name, userId);
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

const updatePresentationInfo = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await updatePresentation(id, name);
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
  if (!presentId || !title) {
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

export {
  createNewPresentation,
  getAllPresentation,
  getPresentationDetail,
  updatePresentationInfo,
  addNewSlide,
  removeSlide,
};
