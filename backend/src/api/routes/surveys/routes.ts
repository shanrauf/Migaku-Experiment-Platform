import { Request, Response, Router, NextFunction } from "express";
import { Container } from "typedi";

import SurveyService from "./service";
import ParticipantService from "../participants/service";
import logger from "../../../loaders/logger";
import * as requests from "./requests";
import middlewares from "../../middlewares";

const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use("/surveys", route);

  route.get(
    "/",
    // middlewares.ensureAuthenticated,
    // middlewares.ensureExperimentParticipant,
    middlewares.validateRequestSchema(requests.ISurveyFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(`GET /surveys with query: %o`, req.query);
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurveys(req.query);
        if (!payload.surveys) {
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
    middlewares.validateRequestSchema(undefined, requests.ICreateSurvey),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(`POST /surveys with body: %o`, req.body);
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.CreateSurvey(req.body);
        return res.status(200).json({ survey: req.body });
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/latest/status",
    async (req: Request, res: Response, next: NextFunction) => {
      /**
       * Status 0: E-mail doesn't exist
       * Status 1: Ready to sync Anki data
       * Status 2: Survey not completed
       * Status 3: Anki data already synced
       */
      try {
        const { email } = req.query;
        const { experimentId } = req.params;
        logger.debug(`GET /experiments/${experimentId}/surveys/latest/status`);
        const participantService = Container.get(ParticipantService);
        const participantId = await participantService.GetParticipantIdByEmail(
          email
        );
        if (!participantId) {
          return res.json({ status: 0 }).status(404);
        }
        const surveyService = Container.get(SurveyService);
        // this errors when no surveys for the experiment but doesn't throw error
        const { survey } = await surveyService.GetLatestSurvey(experimentId);

        const surveyCompleted = await surveyService.GetSurveyCompletionStatus(
          participantId,
          survey.surveyId
        );
        if (!surveyCompleted) {
          const surveyLink = `http://trials.massimmersionapproach.com/experiments/audiovssentencecards/surveys/${survey.surveyId}`;
          return res.json({ status: 2, data: surveyLink }).status(401);
        }

        const ankiDataSubmitted = await surveyService.GetAnkiDataSubmissionStatus(
          participantId,
          survey.surveyId
        );

        if (ankiDataSubmitted) {
          return res.json({ status: 3 }).status(404);
        } else {
          return res.json({ status: 1, data: survey.cutoff }).status(200);
        }
      } catch (err) {
        return next(err);
      }
    }
  );

  route.post(
    "/latest/responses",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId } = req.params;
        logger.debug(
          `POST /experiments/${experimentId}/surveys/latest w/ body %o`,
          req.body
        );
        const surveyService = Container.get(SurveyService);
        const latestSurvey = await surveyService.GetLatestSurvey(experimentId);
        if (!latestSurvey.survey) {
          return res.json(latestSurvey).status(404);
        }

        const { surveyId } = latestSurvey.survey;

        // get participantId from email
        const participantService = Container.get(ParticipantService);
        const participantId = await participantService.GetParticipantIdByEmail(
          req.body.email
        );

        let responseId = await surveyService.findOrCreateResponseId(
          experimentId,
          surveyId,
          participantId
        );

        const payload = await surveyService.PostSurveyResponses(
          experimentId,
          surveyId,
          participantId,
          responseId,
          req.body.data
        );
        if (!payload.questionResponses) {
          return res.json(payload).status(404);
        }
        return res.json(payload).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    "/:surveyId",
    // middlewares.ensureAuthenticated,
    // middlewares.ensureExperimentParticipant,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId, surveyId } = req.params;
        logger.debug(`GET /experiments/${experimentId}/surveys/${surveyId}`);
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurvey(surveyId);
        if (payload.survey === null) {
          return res.json(payload).status(404);
        } else {
          return res.json(payload).status(200);
        }
      } catch (err) {
        return next(err);
      }
    }
  );

  route.post(
    "/:surveyId/responses",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId, surveyId } = req.params;
        logger.debug(
          `POST /experiments/${experimentId}/surveys/${surveyId}/responses w/ body %o`,
          req.body
        );
        const participantService = Container.get(ParticipantService);
        const surveyService = Container.get(SurveyService);

        const participantId = await participantService.GetParticipantIdByEmail(
          req.body.email
        );

        let responseId = await surveyService.findOrCreateResponseId(
          experimentId,
          surveyId,
          participantId
        );

        const questionResponses = await surveyService.PostSurveyResponses(
          experimentId,
          surveyId,
          participantId,
          responseId,
          req.body.data
        );
        return res.json(questionResponses).status(200);
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
