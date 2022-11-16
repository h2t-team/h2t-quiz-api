import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

import { Sequelize, Options } from 'sequelize';
import { AutoOptions, SequelizeAuto } from 'sequelize-auto';

export const sequelize = new Sequelize(process.env.DB_URI ?? '', {
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
});

async function name() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
name();

const options: AutoOptions = {
  caseFile: 'c', caseModel: 'p', caseProp: 'c',
  directory: './src/models',
  singularize: true,
  useDefine: false,
  lang: 'ts',
};

const auto = new SequelizeAuto(sequelize, '', '', options);
auto.run();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running`);
});