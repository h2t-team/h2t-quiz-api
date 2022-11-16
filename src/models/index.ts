import { Sequelize } from 'sequelize';
import { AutoOptions, SequelizeAuto } from 'sequelize-auto';

export const sequelize = new Sequelize(process.env.DB_URI ?? '');

const options: AutoOptions = {
  caseFile: 'c', caseModel: 'p', caseProp: 'c',
  directory: './models',
  singularize: true,
  useDefine: false
};

const auto = new SequelizeAuto(sequelize, '', '', options);
auto.run();
