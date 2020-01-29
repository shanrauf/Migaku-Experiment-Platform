import { Request, Response, Router, NextFunction } from "express";
import { Container } from "typedi";

import ExperimentService from "../experiments/service";
import logger from "../../../loaders/logger";
import QuestionResponseService from "./service";

const route = Router();

export default app => {
  app.use("/questionresponses", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("GET test data");
    try {
      const questionResponseService = Container.get(QuestionResponseService);
      const payload = await questionResponseService.TestData();
      if (!payload) {
        return res.status(404);
      }
      return res.json(payload).status(200);
    } catch (err) {
      return next(err);
    }
  });

  route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("POST /experiments with body: %o", req.body);
    try {
      const experimentService = Container.get(ExperimentService);
      const payload = await experimentService.CreateExperiment(
        req.body.experiment
      );
      if (!payload.experiment) {
        return res.status(404);
      }
      return res.json({ experiment: payload.experiment }).status(201);
    } catch (err) {
      return next(err);
    }
  });

  route.get(
    "/:experimentId",
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(`GET /experiments/${experimentId}`);
      try {
        const experimentService = Container.get(ExperimentService);
        const payload = await experimentService.GetExperiment(experimentId);
        if (!payload.experiment) {
          return res.status(404);
        }
        return res.json(payload).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );
};
