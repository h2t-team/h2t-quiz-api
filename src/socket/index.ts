import { Socket, Server } from 'socket.io';
import SlideSocketHandler from './slide.socket';

const SocketConnectionHandler = (io: Server) => (socket: Socket) => {
  {
    socket.on('join room', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('join room', `a member join room ${roomId}`);
    });

    SlideSocketHandler(io, socket);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('user disconnected');
    });
  }
};

export default SocketConnectionHandler;
