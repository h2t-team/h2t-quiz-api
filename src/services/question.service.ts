import { models } from '../models';

const markQuestionAnswered = (questionId: string, isAnswered = true) => {
  return models.QuestionInPresentation.update(
    {
      isAnswered,
    },
    {
      where: {
        id: questionId,
      },
    },
  );
};

const addQuestion = (question: string, presentationId: string) => {
  return models.QuestionInPresentation.create({
    question,
    presentationId,
    numOfVotes: 0,
    isAnswered: false,
  });
};

export { markQuestionAnswered, addQuestion };
