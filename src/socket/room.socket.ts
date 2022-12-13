import { Socket, Server } from 'socket.io';

const RoomSocketHandler = (io: Server, socket: Socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit('join room', `a member join room ${roomId}`);
  });

  socket.on('update info send', ({ roomId, optionId }) => {
    io.to(roomId).emit('update info receive', { optionId });
  });

  socket.on('change slide', ({ roomId, slideId }) => {
    io.to(roomId).emit('change slide', { slideId });
  });

  socket.on('get data', ({ roomId }) => {
    io.to(roomId).emit('get data');
  });

  socket.on('receive data', ({ roomId, ...rest }) => {
    io.to(roomId).emit('receive data', { ...rest });
  });
};

export default RoomSocketHandler;
