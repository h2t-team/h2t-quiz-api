import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRegisterInfo } from '../interfaces/user.interface';
import { findUser, createUser, checkEmail } from '../services/user.service';
const { OAuth2Client } = require('google-auth-library');
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
    const expiresIn = jwt.verify(
      accessToken,
      config.jwt.accessTokenSecret,
    ) as jwt.JwtPayload;
    res.json({
      success: true,
      message: 'Log in successfully.',
      accessToken,
      expiresIn: expiresIn.exp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

const loginWithGoogle = async (req: Request, res: Response) => {
  const {code} = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Missing information.',
    });
  }
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    //get accessToken and expire
    const accessToken = tokens.access_token;
    const expiresIn = tokens.expiry_date;
    //get username = id, email
    const decoded = jwt.decode(tokens.id_token) as jwt.JwtPayload;
    const username = decoded.sub;
    const email = decoded.email;
    //check if email is taken
    const isEmailTaken = await checkEmail({username, email});
    if (isEmailTaken) {
      return res.status(409).json({
        success: false,
        message: 'Email is already taken',
      });
    }
    const user = await findUser({ username , email });
    if (user) {
      return res.json({
        success: true,
        message: 'Log in successfully again.',
        accessToken,
        expiresIn,
      });
    }
    await createUser(decoded.name, email, "0912345678", username as string, username as string);
    res.json({
      success: true,
      message: 'Log in successfully.',
      accessToken,
      expiresIn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
}

export { register, login, loginWithGoogle };