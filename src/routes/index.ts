import { verifyToken } from '../middlewares/auth.middleware';
import { Request, Response, Router } from 'express';
import AuthRouter from './auth.route';
import GroupRouter from './group.route';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

router.use('/auth', AuthRouter);
router.use('/groups', verifyToken, GroupRouter);

export default router;