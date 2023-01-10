import express, { Express } from 'express';
import createError from 'http-errors';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import config from './config';
import { sequelize } from './models';
import MainRouter from './routes';
import SocketConnectionHandler from './socket';

const app: Express = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost:3000',
      'https://h2t-quiz-game-stag.vercel.app',
      'https://h2t-quiz-game.vercel.app',
    ],
    credentials: true,
  },
});
const port = config.server.port;

async function runApp() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', MainRouter);

    io.on('connection', SocketConnectionHandler(io));

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('⚡️[server]: Server is running');
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
      next();
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

runApp();
