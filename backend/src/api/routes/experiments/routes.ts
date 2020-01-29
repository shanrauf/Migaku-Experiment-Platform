import { Request, Response, Router, NextFunction } from "express";
import { Container } from "typedi";

import ExperimentService from "./service";
import logger from "../../../loaders/logger";
import middlewares from "../../middlewares";
import * as requests from "./requests";
import validateRequestSchema from "../../middlewares/validateRequestSchema";

const route = Router();

export default (app: Router) => {
  app.use("/experiments", route);

  route.get(
    "/",
    middlewares.validateRequestSchema(requests.IExperimentFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug("GET /experiments");
      try {
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
    "/",
    validateRequestSchema(undefined, requests.IExperiment),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug("POST /experiments with body: %o", req.body);
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.CreateExperiment(req.body);
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
    "/:experimentId",
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(`GET /experiments/${experimentId}`);
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiment(experimentId);
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
    "/:experimentId",
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(`DELETE /experiments/${experimentId}`);
      try {
        const experimentService = Container.get(ExperimentService);
        const deletedCount = await experimentService.DeleteExperiment(
          experimentId
        );
        return res
          .status(200)
          .json({ message: `${deletedCount} experiment(s) deleted.` });
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/:experimentId/participants",
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(`GET /experiments/${experimentId}/participants`);
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetParticipants(experimentId);
        if (!payload.participants) {
          return res.status(404).json(payload);
        }
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.put(
    "/:experimentId/participants/:participantId",
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, participantId } = req.params;
      logger.debug(
        `PUT /experiments/${experimentId}/participants/${participantId}`
      );
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.RegisterParticipant(
          experimentId,
          participantId
        );
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );
};
