import { Router } from 'express';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.get('/', (req, res) => {
  res.json({ success: true, data: 'Auth Route' });
});

export default router;
