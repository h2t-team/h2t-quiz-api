import { Router } from 'express';
import {
  login,
  register,
  loginWithGoogle,
  activateAccount,
  resendEmail,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/login-with-google', loginWithGoogle);
router.get('/', (req, res) => {
  res.json({ success: true, data: 'Auth Route' });
});
router.get('/activate-account', activateAccount);
router.post('/resend-email', resendEmail);
export default router;
