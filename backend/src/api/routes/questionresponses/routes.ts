import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import QuestionResponseService from './service';
import middlewares from '../../middlewares';
import * as requests from './requests';
import logger from '../../../loaders/logger';

const route = Router();

export default (app) => {
  app.use('/questionresponses', route);

  route.get(
    '/',
    // middlewares.ensureAdmin,
    middlewares.validateRequestSchema(
      requests.QuestionResponseFilters,
      undefined
    ),
    async (req: Request, res: Response, next: NextFunction) => {
      const filters = { ...req.query };
      if (req.body?.filters?.length) {
        filters['filters'] = req.body.filters;
      }
      try {
        const questionResponseService = Container.get(QuestionResponseService);
        const payload = await questionResponseService.GetQuestionResponses(
          filters as any
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

  // route.get(
  //   '/distribution',
  //   // middlewares.ensureAdmin,
  //   // middlewares.validateRequestSchema(
  //   //   requests.QuestionResponseFilters,
  //   //   undefined
  //   // ),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const filters = { ...req.query };
  //     if (req.body?.filters?.length) {
  //       filters['filters'] = req.body.filters;
  //     }
  //     logger.silly(filters);
  //     try {
  //       const questionResponseService = Container.get(QuestionResponseService);
  //       const payload = await questionResponseService.GetQuestionDistribution(
  //         filters as any
  //       );
  //       if (!payload) {
  //         return res.status(404);
  //       }
  //       return res.json(payload).status(200);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  // );

  route.get(
    '/surveyaverages',
    // middlewares.ensureAdmin,
    middlewares.validateRequestSchema(
      requests.QuestionResponseFilters,
      undefined
    ),
    async (req: Request, res: Response, next: NextFunction) => {
      const filters = { ...req.query };
      if (req.body?.filters?.length) {
        filters['filters'] = req.body.filters;
      }
      try {
        const questionResponseService = Container.get(QuestionResponseService);
        const payload = await questionResponseService.GetAverageQuestionResponses(
          filters as any
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
