import { Router } from 'express';
import {
  addNewSlide,
  createNewPresentation,
  getAllPresentation,
  getDetailSlideInPresentation,
  getPresentationDetail,
  getPresentationWithCode,
  removeSlide,
  updatePresentationInfo,
} from '../controllers/presentation.controller';

const router = Router();

router.post('/', createNewPresentation);
router.get('/', getAllPresentation);
router.patch('/', updatePresentationInfo);
router.post('/slide', addNewSlide);
router.delete('/slide', removeSlide);
router.get('/code/:code', getPresentationWithCode);
router.get('/:presentId', getPresentationDetail);
router.get('/:presentId/:slideId', getDetailSlideInPresentation);

export default router;
