import { Socket, Server } from 'socket.io';

const GroupSocket = (io: Server, socket: Socket) => {
  socket.on('notify present', ({ roomId, inviteCode }) => {
    io.to(roomId).emit('notify present', { inviteCode });
  });

  socket.on('stop present', ({ roomId }) => {
    io.to(roomId).emit('stop present');
  });
};

export default GroupSocket;
