import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', (req, res) => {
  res.json({ success: true, data: 'Auth Route' });
});

export default router;
