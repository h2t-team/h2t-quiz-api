import {
  addNewOption,
  changeSlideType,
  removeOption,
  updateOption,
  updateSlide,
  updateSlideParagraph,
} from '../controllers/slide.controller';
import { Router } from 'express';

const router = Router();

router.post('/', addNewOption);
router.patch('/', updateOption);
router.patch('/:slideId/type', changeSlideType);
router.patch('/:slideId/para', updateSlideParagraph);
router.patch('/:slideId', updateSlide);
router.delete('/', removeOption);

export default router;
