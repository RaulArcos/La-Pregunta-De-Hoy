import logger from 'pino';

export const getQuestion = async(questionId: number): Promise<Question> => {
    const childLog = logger().child({questionId});
    childLog.info('Getting a question');

    const question = await getQuestionFromDb(questionId);
    if(!question){
        childLog.info('Question not found');
        throw QuestionNotFound;
    }

    childLog.info('Question retrieved successfully')
}