import {
  addNewOption,
  removeOption,
  updateOption,
} from '../controllers/slide.controller';
import { Router } from 'express';

const router = Router();

router.post('/', addNewOption);
router.patch('/', updateOption);
router.delete('/', removeOption);

export default router;
