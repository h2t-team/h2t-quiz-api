import { Socket, Server } from 'socket.io';
import RoomSocketHandler from './room.socket';

const SocketConnectionHandler = (io: Server) => (socket: Socket) => {
  {
    RoomSocketHandler(io, socket);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('user disconnected');
    });
  }
};

export default SocketConnectionHandler;
