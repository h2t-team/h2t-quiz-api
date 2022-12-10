import { verifyToken } from '../middlewares/auth.middleware';
import { Request, Response, Router } from 'express';
import AuthRouter from './auth.route';
import GroupRouter from './group.route';
import UserRouter from './user.route';
import PresentRouter from './presentation.route';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

router.use('/auth', AuthRouter);
router.use('/groups', verifyToken, GroupRouter);
router.use('/user', verifyToken, UserRouter);
router.use('/presentation', verifyToken, PresentRouter);

export default router;
