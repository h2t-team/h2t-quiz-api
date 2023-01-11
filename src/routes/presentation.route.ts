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
  getSlidePreviews,
  getQuestionsInPresentation,
  getPresentationInGroup,
  turnOffPresentationInGroup,
  setDeletePresentation,
} from '../controllers/presentation.controller';

const router = Router();

router.post('/', createNewPresentation);
router.get('/', getAllPresentation);
router.patch('/', updatePresentationInfo);
router.post('/slide', addNewSlide);
router.delete('/slide', removeSlide);
router.get('/code/:code', getPresentationWithCode);
router.get('/group/:groupId', getPresentationInGroup);
router.post('/group/:groupId', turnOffPresentationInGroup);
router.get('/:presentId', getPresentationDetail);
router.get('/:presentId/slidepreviews', getSlidePreviews);
router.get('/:presentId/questions', getQuestionsInPresentation);
router.get('/:presentId/:index', getDetailSlideInPresentation);
router.put('/setDeletePresentation', setDeletePresentation);
export default router;
