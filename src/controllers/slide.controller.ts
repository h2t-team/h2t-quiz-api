import { Request, Response } from 'express';
import {
  addOptionToSlide,
  deleteOptionFromSlide,
  updateOptionInfo,
  updateSlideInfo,
  updateSlidePara,
  updateSlideType,
} from '../services/slide.service';

const addNewOption = async (req: Request, res: Response) => {
  const { slideId, option } = req.body;
  if (!slideId || !option) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await addOptionToSlide(slideId, option);
    return res.status(200).json({
      succcess: true,
      message: 'Option added successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updateSlide = async (req: Request, res: Response) => {
  const { slideId } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await updateSlideInfo(Number.parseInt(slideId), title);
    return res.status(200).json({
      succcess: true,
      message: 'Slide update successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const changeSlideType = async (req: Request, res: Response) => {
  const { type } = req.body;
  const { slideId } = req.params;
  if (!slideId || !type) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }

  if (type !== 'poll' && type !== 'heading' && type !== 'paragraph') {
    return res.status(400).json({
      success: false,
      message: 'Slide type is invalid!',
    });
  }

  try {
    await updateSlideType(Number.parseInt(slideId), type);
    return res.status(200).json({
      succcess: true,
      message: 'Change type successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updateSlideParagraph = async (req: Request, res: Response) => {
  const { paragraph } = req.body;
  const { slideId } = req.params;
  if (!paragraph || !slideId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await updateSlidePara(Number.parseInt(slideId), paragraph);
    return res.status(200).json({
      succcess: true,
      message: 'Paragraph update successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const updateOption = async (req: Request, res: Response) => {
  const { optionId, option, amount } = req.body;
  if (!optionId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await updateOptionInfo(optionId, option, amount);
    return res.status(200).json({
      succcess: true,
      message: 'Option update successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const removeOption = async (req: Request, res: Response) => {
  const { optionId } = req.body;
  if (!optionId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await deleteOptionFromSlide(optionId);
    return res.status(200).json({
      succcess: true,
      message: 'Option delete successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export {
  addNewOption,
  updateSlide,
  changeSlideType,
  updateOption,
  updateSlideParagraph,
  removeOption,
};
