import { Socket, Server } from 'socket.io';

const RoomSocketHandler = (io: Server, socket: Socket) => {
  socket.on('join room', (roomId) => {
    // eslint-disable-next-line no-console
    console.log('join room', roomId);
    socket.join(roomId);
    io.to(roomId).emit('join room', `a member join room ${roomId}`);
  });

  socket.on('update info', ({ roomId, optionId }) => {
    io.to(roomId).emit('update info', { optionId });
  });

  socket.on('change slide', ({ roomId, slideId }) => {
    io.to(roomId).emit('change slide', { slideId });
  });
};

export default RoomSocketHandler;
