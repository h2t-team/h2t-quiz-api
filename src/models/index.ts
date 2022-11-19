import { Sequelize } from 'sequelize';
import { initModels } from './init-models';

export const sequelize = new Sequelize(process.env.DB_URI ?? '', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const models = initModels(sequelize);
