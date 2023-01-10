import { Socket, Server } from 'socket.io';

const GroupSocketHandler = (io: Server, socket: Socket) => {
  socket.on(
    'notify present',
    ({ roomId, inviteCode, presentName, groupName }) => {
      socket.broadcast.to(roomId).emit('notify present', {
        inviteCode,
        presentName,
        groupName,
      });
    },
  );

  socket.on('stop present', ({ roomId }) => {
    io.to(roomId).emit('stop present');
  });
};

export default GroupSocketHandler;
