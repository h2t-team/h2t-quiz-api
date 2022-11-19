import { Request, Response, Router } from 'express';
import AuthRouter from './auth.route';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

router.use('/auth', AuthRouter);
export default router;
