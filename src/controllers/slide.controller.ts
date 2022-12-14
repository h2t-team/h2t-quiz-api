import { Request, Response } from 'express';
import {
  addOptionToSlide,
  deleteOptionFromSlide,
  updateOptionInfo,
  updateSlideInfo,
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

export { addNewOption, updateSlide, updateOption, removeOption };
