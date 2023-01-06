import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { models } from '../models';

import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

interface FindUserParams {
  username?: string;
  email?: string;
}

interface UpdateUserInfo {
  fullname?: string;
  phone?: string;
}

const findUser = ({ username = '', email = '' }: FindUserParams) => {
  return models.User.findOne({
    raw: true,
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
};

const findUserById = (userId = '') => {
  return models.User.findByPk(userId, {
    raw: true,
  });
};

const createUser = (
  fullname: string,
  email: string,
  phone: string | null,
  username: string,
  password: string,
  active: boolean,
) => {
  const hashPassword = bcrypt.hashSync(password, 10);
  return models.User.create({
    id: uuidv4(),
    fullname,
    email,
    phone: phone!,
    username,
    password: hashPassword,
    createAt: new Date(),
    active,
  });
};

const sendActivationEmail = async (email, token) => {
  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, '../templates/'),
      layoutsDir: path.join(__dirname, '../templates/'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../templates/'),
    extName: '.hbs',
  };

  const transporter = await nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.use('compile', hbs(hbsConfig));

  const link = `${process.env.CLIENT_URL}/auth/activate-account?token=${token}`;
  const title = 'Welcome!';
  const description =
    'We are excited to have you get started. First, you need to activate your account. Just press the button below.';
  const button = 'Activate Account';
  const data = { email, link, title, description, button };

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Activation Email - H2T',
    template: 'emailTemplate',
    context: data,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw Error('Send activation mail fail');
  }
};

const sendResetPasswordEmail = async (email, token) => {
  const hbsConfig = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, '../templates/'),
      layoutsDir: path.join(__dirname, '../templates/'),
      defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../templates/'),
    extName: '.hbs',
  };

  const transporter = await nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.use('compile', hbs(hbsConfig));

  const link = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`;
  const title = 'Welcome Back!';
  const description =
    'There was recently a request to change the password for your account. If you requested this change, press the button below.';
  const button = 'Reset Password';
  const data = { email, link, title, description, button };

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Reset Password Email - H2T',
    template: 'emailTemplate',
    context: data,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw Error('Send reset password mail fail');
  }
};

const updateAccountActivation = async (id: string, active: boolean) => {
  return await models.User.update(
    {
      active: active,
    },
    {
      where: {
        id: id,
      },
    },
  );
};

const checkEmail = ({ username = '', email = '' }: FindUserParams) => {
  return models.User.findOne({
    raw: true,
    where: {
      email: email,
      username: {
        [Op.not]: username,
      },
    },
  });
};

const updateUser = (
  id: string,
  fullname: string | undefined,
  phone: string | undefined,
) => {
  const updateOption: UpdateUserInfo = {};
  if (fullname) {
    updateOption.fullname = fullname;
  }
  if (phone) {
    updateOption.phone = phone;
  }
  return models.User.update(updateOption, {
    where: { id },
  });
};

const updateUserPassword = async (id: string, password: string) => {
  const hashPassword = bcrypt.hashSync(password, 10);
  return await models.User.update(
    {
      password: hashPassword,
    },
    {
      where: {
        id: id,
      },
    },
  );
};

export {
  findUser,
  findUserById,
  createUser,
  checkEmail,
  sendActivationEmail,
  sendResetPasswordEmail,
  updateAccountActivation,
  updateUser,
  updateUserPassword,
};
