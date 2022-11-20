import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { models } from '../models';

interface FindUserParams {
  username?: string;
  email?: string;
}

const findUser = ({ username = '', email = '' }: FindUserParams) => {
  return models.User.findOne({
    raw: true,
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
};

const createUser = (
  fullname: string,
  email: string,
  phone: string,
  username: string,
  password: string,
) => {
  const hashPassword = bcrypt.hashSync(password, 10);
  return models.User.create({
    id: uuidv4(),
    fullname,
    email,
    phone,
    username,
    password: hashPassword,
    createAt: new Date(),
  });
};

export { findUser, createUser };
