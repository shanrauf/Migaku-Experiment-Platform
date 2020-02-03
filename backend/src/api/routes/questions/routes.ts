import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import logger from '../../../loaders/logger';
import middlewares from '../../middlewares';
import * as requests from './requests';
import validateRequestSchema from '../../middlewares/validateRequestSchema';
import QuestionService from './service';

const route = Router();

export default (app: Router) => {
  app.use('/questions', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.IExperimentFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('GET /experiments');
    }
  );

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('POST /questions with body: %o', req.body);
    try {
      const questionService = Container.get(QuestionService);
    } catch (err) {
      return next(err);
    }
  });
};
