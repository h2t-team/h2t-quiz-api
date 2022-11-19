import { UserRegisterInfo } from '@/interfaces/user.interface';
import { Request, Response } from 'express';
import { findUser, createUser } from '../services/user.service';

const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { fullname, email, phone, username, password }: UserRegisterInfo =
    req.body;
  if (!fullname || !email || !phone || !username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing information.',
    });
  }
  try {
    const user = await findUser({ username, email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User is already existed.',
      });
    }
    const newUser = await createUser(
      fullname,
      email,
      phone,
      username,
      password,
    );
    res.json({ success: true, message: 'User create successfully.' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

export { register };
