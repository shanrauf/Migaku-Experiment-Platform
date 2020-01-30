import { Request, Response, Router, NextFunction } from "express";
import { Container } from "typedi";

import QuestionService from "./service";
import logger from "../../../loaders/logger";
import middlewares from "../../middlewares";
import * as requests from "./requests";

const route = Router();

export default (app: Router) => {
  app.use("/questions", route);

  route.get(
    "/",
    middlewares.validateRequestSchema(requests.IQuestionFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug("GET /questions");
      try {
        const questionService = Container.get(QuestionService);
        const payload = await questionService.GetQuestions(
          req.query as requests.IQuestionFilters
        );
        if (!payload.questions.length) {
          return res.status(404).json(payload);
        }
        return res.status(200).json(payload);
      } catch (err) {
        return next(err);
      }
    }
  );
};
