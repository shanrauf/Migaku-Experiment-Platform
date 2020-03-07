import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import ExperimentService from './service';
import logger from '../../../loaders/logger';
import middlewares from '../../middlewares';
import * as requests from './requests';
import validateRequestSchema from '../../middlewares/validateRequestSchema';

const route = Router();

export default (app: Router) => {
  app.use('/experiments', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.IExperimentFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug('GET /experiments with params %o', req.query);
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiments(
          req.query as requests.IExperimentFilters
        );
        if (!payload.experiments.length) {
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
    validateRequestSchema(undefined, requests.IExperiment),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug('POST /experiments with body: %o', req.body);
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.CreateExperiment(
          req.body as requests.IExperiment
        );
        if (!payload.experiment) {
          return res.status(404).json(payload);
        }
        return res.status(201).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:experimentId',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(`GET /experiments/${req.params.experimentId}`);
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiment(
          req.params.experimentId
        );
        if (!payload.experiment) {
          return res.status(404).json(payload);
        }
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.delete(
    '/:experimentId',
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(`DELETE /experiments/${req.params.experimentId}`);
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.DeleteExperiment(
          req.params.experimentId
        );
        if (!payload.deletedCount) {
          return res.status(404).json(payload);
        }
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:experimentId/participants',
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(
        `../../participants?experimentId=${req.params.experimentId}`
      );
    }
  );

  route.put(
    '/:experimentId/participants/:participantId',
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(
        `PUT /experiments/${req.params.experimentId}/participants/${req.params.participantId}`
      );
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.RegisterParticipant(
          req.params.experimentId,
          req.params.participantId
        );
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.delete(
    '/:experimentId/participants/:participantId',
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug(
        `DELETE /experiments/${req.params.experimentId}/participants/${req.params.participantId}`
      );
      try {
        const experimentService = Container.get(ExperimentService);
        await experimentService.DropParticipant(
          req.params.experimentId,
          req.params.participantId
        );
        return res.status(200).json({
          message: `${req.params.participantId} successfully dropped from ${req.params.experimentId}`
        });
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:experimentId/questions',
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(`../../questions?experimentId=${req.params.experimentId}`);
    }
  );
};
