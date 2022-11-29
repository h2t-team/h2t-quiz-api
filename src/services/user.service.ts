import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { models } from '../models';

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
  });
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

export { findUser, createUser, checkEmail, findUserById, updateUser };
