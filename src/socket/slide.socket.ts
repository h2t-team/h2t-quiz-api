import { Socket, Server } from 'socket.io';

const SlideSocketHandler = (io: Server, socket: Socket) => {
  socket.on('update info send', ({ roomId, optionId }) => {
    socket.broadcast.to(roomId).emit('update info receive', { optionId });
  });

  socket.on('change slide', ({ roomId, slideIndex }) => {
    io.to(roomId).emit('change slide', { slideIndex });
  });

  socket.on('end slide', ({ roomId }) => {
    io.to(roomId).emit('end slide');
  });

  socket.on('get data', ({ roomId }) => {
    io.to(roomId).emit('get data');
  });

  socket.on('receive data', ({ roomId, ...rest }) => {
    socket.broadcast.to(roomId).emit('receive data', { ...rest });
  });
};

export default SlideSocketHandler;
