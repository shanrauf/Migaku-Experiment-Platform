import { Request, Response, Router, NextFunction } from "express";
import { Container } from "typedi";

import logger from "../../../loaders/logger";
import * as requests from "./requests";
// import middlewares from "../middlewares";

const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use("/surveys", route);

  route.get(
    "/",
    // middlewares.ensureAuthenticated,
    // middlewares.ensureExperimentParticipant,
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      try {
        logger.debug(`GET /requirements with params: %o`, req.params);
        return res.json({ test: "test" }).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );
};
