import { ErrorHandler } from './../../../utils/index';
import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import ExperimentService from './service';
import middlewares from '../../middlewares';
import * as requests from './requests';
import validateRequestSchema from '../../middlewares/validateRequestSchema';

const route = Router();

export default (app: Router) => {
  app.use('/experiments', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.ExperimentFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiments(
          req.query as requests.ExperimentFilters
        );
        return payload.experiments.length
          ? res.status(200).json(payload)
          : res.status(404).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );

  // Admin route
  route.post(
    '/',
    middlewares.blockRoute,
    validateRequestSchema(undefined, requests.IExperiment),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.CreateExperiment(
          req.body as requests.IExperiment
        );
        return payload.experiment
          ? res.status(201).json(payload)
          : res.status(404).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    '/:experimentId',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiment(
          req.params.experimentId
        );
        return payload.experiment
          ? res.status(200).json(payload)
          : res.status(404).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );

  route.patch(
    '/:experimentId',
    middlewares.blockRoute,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        const { experiment } = await experimentService.UpdateExperiment(
          req.params.experimentId,
          req.body as Partial<requests.IExperiment>
        );
        return experiment
          ? res.status(200).json({ experiment })
          : res.status(404).json({ experiment });
      } catch (err) {
        next(err);
      }
    }
  );

  // Admin route
  route.delete(
    '/:experimentId',
    middlewares.blockRoute,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.DeleteExperiment(
          req.params.experimentId
        );
        return payload.deletedCount
          ? res.status(200).json(payload)
          : res.status(400).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );

  route.put(
    '/:experimentId/participants/:participantId',
    middlewares.blockRoute,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        /**
         * TODO: Enable this once tests account for authentication.
         */
        // if (!req.user.adminId && req.user.participantId !== req.params.participantId) {
        //   throw new ErrorHandler(403, "You are not authorized to access this route.");
        // }
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.RegisterParticipant(
          req.params.experimentId,
          req.params.participantId
        );
        return res.status(200).json(payload);
      } catch (err) {
        next(err);
      }
    }
  );

  route.delete(
    '/:experimentId/participants/:participantId',
    middlewares.blockRoute,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.params.participantId !== req.user.participantId) {
          return res.status(403).json({
            message: 'You are not authenticated to access this route'
          });
        }
        const experimentService = Container.get(ExperimentService);
        await experimentService.DropParticipant(
          req.params.experimentId,
          req.params.participantId
        );
        return res.status(200).json({
          message: `${req.params.participantId} successfully dropped from ${req.params.experimentId}`
        });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    '/:experimentId/questions',
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(`questions?experimentId=${req.params.experimentId}`);
    }
  );

  route.get(
    '/:experimentId/participants',
    middlewares.blockRoute,
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(`participants?experimentId=${req.params.experimentId}`);
    }
  );

  /**
   * Admin route to add questions to an experiment's question schema.
   */
  route.post(
    '/:experimentId/questions',
    middlewares.blockRoute,
    validateRequestSchema(null, requests.IExperimentQuestions),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const experimentService = Container.get(ExperimentService);
        await experimentService.AddQuestionsToExperimentSchema(
          req.params.experimentId,
          req.body.questions
        );
        return res.status(200).json({
          message: `${req.body.questions.length} questions associated with ${req.params.experimentId}`
        });
      } catch (err) {
        next(err);
      }
    }
  );
};
