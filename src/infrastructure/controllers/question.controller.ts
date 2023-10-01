import {Request, Response} from 'express';
import {QuestionRetrievedOk} from './apiResponses';

export const getQuestion = async (req: Request, res: Response) => {
    const questionId: number = parseInt(req.params.questionId);
    try{
        const question = await questionUsecase.getQuestion(questionId);
        res.json({ response: QuestionRetrievedOk, data: question})
    }catch(error){
        res.json({responses: error});
    }
    
}