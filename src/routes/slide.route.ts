import {
  addNewOption,
  removeOption,
  updateOption,
  updateSlide,
} from '../controllers/slide.controller';
import { Router } from 'express';

const router = Router();

router.post('/', addNewOption);
router.patch('/', updateOption);
router.patch('/:slideId', updateSlide);
router.delete('/', removeOption);

export default router;
