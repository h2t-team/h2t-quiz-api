import { Router } from 'express';
import {
  addNewSlide,
  createNewPresentation,
  getAllPresentation,
  getPresentationDetail,
  removeSlide,
  updatePresentationInfo,
} from '../controllers/presentation.controller';

const router = Router();

router.post('/', createNewPresentation);
router.get('/', getAllPresentation);
router.patch('/', updatePresentationInfo);
router.post('/slide', addNewSlide);
router.delete('/slide', removeSlide);
router.get('/:presentId', getPresentationDetail);
router.get('/:presentId/:slideId', getPresentationDetail);

export default router;
