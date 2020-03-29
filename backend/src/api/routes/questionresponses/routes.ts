import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import logger from '../../../loaders/logger';
import QuestionResponseService from './service';
import middlewares from '../../middlewares';
import * as requests from './requests';

const route = Router();

export default (app) => {
  app.use('/questionresponses', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(
      requests.QuestionResponseFilters,
      undefined
    ),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('GET question responses with params %o', req.query);
      try {
        const questionResponseService = Container.get(QuestionResponseService);
        const payload = await questionResponseService.GetQuestionResponses(
          req.query
        );
        if (!payload) {
          return res.status(404);
        }
        return res.json(payload).status(200);
      } catch (err) {
        next(err);
      }
    }
  );
};
