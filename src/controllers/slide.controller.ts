import { Request, Response } from 'express';
import {
  addOptionToSlide,
  deleteOptionFromSlide,
  updateOptionInfo,
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

const updateOption = async (req: Request, res: Response) => {
  const { slideId, option, amount } = req.body;
  if (!slideId) {
    return res.status(400).json({
      success: false,
      message: 'Missing information!',
    });
  }
  try {
    await updateOptionInfo(slideId, option, amount);
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

export { addNewOption, updateOption, removeOption };
