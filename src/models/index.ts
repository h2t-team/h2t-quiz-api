import { Sequelize } from 'sequelize';
import config from '../config';
import { initModels } from './init-models';

export const sequelize = new Sequelize("quizgame","postgres", "nvmt123456", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const models = initModels(sequelize);
