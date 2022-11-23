import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRegisterInfo } from '../interfaces/user.interface';
import { findUser, createUser } from '../services/user.service';

const register = async (req: Request, res: Response) => {
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
    await createUser(fullname, email, phone, username, password);
    res.json({ success: true, message: 'User create successfully.' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing information.',
    });
  }
  try {
    const user = await findUser({ username });
    const isPwValid = bcrypt.compareSync(password, user?.password);
    if (!user || !isPwValid) {
      return res.status(404).json({
        success: false,
        message: 'Username or password is incorrect.',
      });
    }
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      config.jwt.accessTokenSecret,
      { expiresIn: config.jwt.accessTokenExpired },
    );
    res.json({
      success: true,
      message: 'Log in successfully.',
      accessToken,
      expiresIn: jwt.verify(accessToken, config.jwt.accessTokenSecret).exp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

export { register, login };
