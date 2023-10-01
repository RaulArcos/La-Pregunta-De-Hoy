import express from 'express';
import * as questionController from '../controllers/question.controller'

const router = express.Router()

router.get('/question/:questionId', questionController.getQuestion);
export default router;