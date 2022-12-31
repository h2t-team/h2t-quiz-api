import { Sequelize } from 'sequelize';
import config from '../config';
import { initModels } from './init-models';

export const sequelize = new Sequelize(config.server.dtbUri, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// export const sequelize = new Sequelize(config.server.dtbUri);

export const models = initModels(sequelize);
