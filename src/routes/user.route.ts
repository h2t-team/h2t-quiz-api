import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/user.controller';

const router = Router();

router.get('/', getUserInfo);
router.post('/', updateUserInfo);

export default router;
