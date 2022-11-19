import express, { Express } from 'express';
import createError from 'http-errors';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

import { sequelize } from './models';
import MainRouter from './routes';

async function name() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', MainRouter);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running`);
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500).json({
        success: false,
        message: err.message,
      });
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}
name();
