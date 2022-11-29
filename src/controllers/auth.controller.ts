import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRegisterInfo } from '../interfaces/user.interface';
import {
  findUser,
  createUser,
  checkEmail,
  sendActivationEmail,
  updateAccountActivation,
} from '../services/user.service';
import { OAuth2Client } from 'google-auth-library';

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
    await createUser(fullname, email, phone, username, password, false);
    // send active link to email
    const token = jwt.sign(
      { username, email },
      process.env.PRIVATE_KEY as jwt.Secret,
      { expiresIn: '20m' },
    );
    try {
      await sendActivationEmail(email, token);
      return res.json({
        success: true,
        message: 'Send activation email successfully.',
        email: email,
      });
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  } catch (error) {
    return res.status(500).json({
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
    if (user.active === false) {
      return res.json({
        success: true,
        message: 'Activate before login.',
        email: user.email,
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
    return res.json({
      success: true,
      message: 'Log in successfully.',
      userId: user.id,
      accessToken,
      expiresIn: expiresIn.exp,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
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
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Missing information.',
    });
  }
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    //get accessToken
    const accessToken = tokens.access_token;
    //get username = id, email
    const decoded = jwt.decode(tokens.id_token!) as jwt.JwtPayload;
    const username = decoded.sub;
    const email = decoded.email;
    const expiresIn = decoded.exp;
    //check if email is taken
    const isEmailTaken = await checkEmail({ username, email });
    if (isEmailTaken) {
      return res.status(409).json({
        success: false,
        message: 'Email is already taken',
      });
    }
    const user = await findUser({ username, email });
    if (user) {
      return res.json({
        success: true,
        message: 'Log in successfully again.',
        accessToken,
        expiresIn,
      });
    }
    await createUser(
      decoded.name,
      email,
      null,
      username as string,
      username as string,
      true,
    );
    return res.json({
      success: true,
      message: 'Log in successfully.',
      accessToken,
      expiresIn,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

const activateAccount = async (req, res) => {
  const { token } = req.query;
  try {
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.PRIVATE_KEY as jwt.Secret,
      ) as jwt.JwtPayload;
      if (!decodedToken) {
        return res.status(500).json({
          success: false,
          message: 'Token validate fail',
        });
      }
      const { username, email } = decodedToken;
      var user = await findUser({ username, email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'This account does not exists!',
        });
      }
      if (user.active == true) {
        return res.json({
          success: true,
          message: 'This account has been already activated. Please log in.',
        });
      } else {
        await updateAccountActivation(user.id, true);
        return res.json({
          success: true,
          message: 'Your account has been successfully activated.',
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: 'No token found',
      });
    }
  } catch (err: any) {
    console.log('err', err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const resendEmail = async (req, res) => {
  const { email, token } = req.body;
  let newToken = '';
  let newEmail = '';
  if (token) {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    if (!decodedToken) {
      return res.status(500).json({
        success: false,
        message: 'Token validate fail',
      });
    }
    const { username, email } = decodedToken;
    var user = await findUser({ username, email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'This account does not exists!',
      });
    }
    newToken = jwt.sign(
      { username, email },
      process.env.PRIVATE_KEY as string,
      { expiresIn: '20m' },
    );
    newEmail = email;
  } else {
    const user = await findUser({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'This account does not exists!',
      });
    }
    const username = user?.username;
    newToken = jwt.sign(
      { username, email },
      process.env.PRIVATE_KEY as string,
      { expiresIn: '20m' },
    );
    newEmail = email;
  }
  try {
    await sendActivationEmail(newEmail, newToken);
    return res.json({
      success: true,
      message: 'Send activation email successfully.',
      email: newEmail,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { register, login, loginWithGoogle, activateAccount, resendEmail };
