import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import logger from '../../../loaders/logger';
import * as requests from './requests';
import RequirementService from './service';
import middlewares from '../../middlewares';

const route = Router({ mergeParams: true });

export default (app: Router): void => {
  app.use('/surveys', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.RequirementFilters, null),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(`GET /requirements with query: %o`, req.query);
        const requirementService = Container.get(RequirementService);
        const payload = await requirementService.GetRequirements(
          req.query as requests.RequirementFilters
        );
        return payload.requirements.length
          ? res.status(200).json(payload)
          : res.status(404).json(payload);
        return res.json({ test: 'test' }).status(200);
      } catch (err) {
        next(err);
      }
    }
  );
};
