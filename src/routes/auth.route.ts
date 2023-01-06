import { Router } from 'express';
import {
  login,
  register,
  loginWithGoogle,
  activateAccount,
  resendEmail,
  forgotPassword,
  resetPassword,
  getResetPasswordAccount,
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
router.post('/forgot-password', forgotPassword);
router.get('/reset-password', getResetPasswordAccount);
router.post('/reset-password', resetPassword);
export default router;
