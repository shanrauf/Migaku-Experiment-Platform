import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import logger from '../../../loaders/logger';
import middlewares from '../../middlewares';
import * as requests from './requests';
import QuestionService from './service';

const route = Router();

export default (app: Router) => {
  app.use('/questions', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.IQuestionFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('GET /questions with query params: %o', req.query);
      try {
        const questionService = Container.get(QuestionService);
        const payload = await questionService.GetQuestions(
          req.query as requests.IQuestionFilters
        );
        if (!payload.questions.length) {
          return res.status(404).json(payload);
        }
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );
  route.post(
    '/',
    middlewares.validateRequestSchema(undefined, requests.ICreateQuestions),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(
          `POST /questions with body: %o`,
          req.body as requests.ICreateQuestions
        );
        const questionService = Container.get(QuestionService);
        await questionService.CreateQuestions(req.body.questions);
        return res.status(200).json(req.body);
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
