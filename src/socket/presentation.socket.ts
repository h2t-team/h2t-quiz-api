import {
  addQuestion,
  markQuestionAnswered,
} from '../services/question.service';
import { Socket, Server } from 'socket.io';

const PresentationSocketHandler = (io: Server, socket: Socket) => {
  socket.on('mark question answered', async function ({ roomId, questionId }) {
    try {
      await markQuestionAnswered(questionId);
      io.to(roomId).emit('marked question answered', {
        roomId,
        questionId,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  socket.on('add question', async function ({ roomId, question }) {
    try {
      await addQuestion(question, roomId);
      io.to(roomId).emit('added question', {
        roomId,
        question,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  socket.on('send message', async function ({ roomId, messageText, username }) {
    io.to(roomId).emit('receive message', {
      messageText,
      username,
    });
  });
};

export default PresentationSocketHandler;
