import { Socket, Server } from 'socket.io';
import SlideSocketHandler from './slide.socket';

const SocketConnectionHandler = (io: Server) => (socket: Socket) => {
  {
    SlideSocketHandler(io, socket);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('user disconnected');
    });
  }
};

export default SocketConnectionHandler;
