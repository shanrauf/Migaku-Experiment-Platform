import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import * as requests from './requests';
import RequirementService from './service';
import middlewares from '../../middlewares';

const route = Router({ mergeParams: true });

export default (app: Router): void => {
  app.use('/surveys', route);

  route.get(
    '/',
    middlewares.ensureAdmin,
    middlewares.validateRequestSchema(requests.RequirementFilters, null),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const requirementService = Container.get(RequirementService);
        const payload = await requirementService.GetRequirements(
          req.query as requests.RequirementFilters
        );
        return payload.requirements.length
          ? res.status(200).json(payload)
          : res.status(404).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );
};
