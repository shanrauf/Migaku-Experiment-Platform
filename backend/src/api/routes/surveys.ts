import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import SurveyService from '../../services/survey';
import ParticipantService from '../../services/participant';
import { ISurvey } from '../../interfaces/ISurvey';
import logger from '../../loaders/logger';

const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use('/experiments/:experimentId/surveys', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { experimentId } = req.params;
    try {
      logger.debug(`GET /experiments/${experimentId}/surveys with params: %o`);
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.GetSurveys(experimentId);
      if (!payload.surveys) {
        return res.status(404).send('Not found');
      }
      return res.json(payload).status(200);
    } catch (err) {
      return next(err);
    }
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { experimentId } = req.params;
    const { survey } = req.body;
    logger.debug(
      `POST /experiments/${experimentId}/surveys with body: %o`,
      req.body
    );
    try {
      // Creates a survey
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.CreateSurvey(
        experimentId,
        survey as ISurvey
      );
      if (!payload) {
        return res.send(401);
      }
      return res.json({ survey, status: 'Survey updated' }).status(200);
    } catch (err) {
      next(err); // handles the error, but reveals exactly wht the error was...
    }
  });

  route.get(
    '/latest',
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(`GET /experiments/${experimentId}/surveys/latest`);
      try {
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetLatestSurvey(experimentId);
        if (!payload.survey) {
          return res.json(payload).status(404);
        }
        return res.json(payload).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:surveyId',
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, surveyId } = req.params;
      logger.debug(
        `GET /experiments/${experimentId}/surveys/${req.params.surveyId}`
      );
      try {
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurvey(surveyId);
        if (payload.survey === null) {
          return res.json(payload).status(404); // returns 200 instead of 404 when null??
        } else {
          return res.json(payload).status(200);
        }
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/latest/status', // TODO: decouple anki stuff from this route...
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      const { email } = req.query;
      logger.debug(`GET /experiments/${experimentId}/surveys/latest/status`);
      try {
        const participantService = Container.get(ParticipantService);
        const participantId = await participantService.GetParticipantIdByEmail(
          email
        );
        if (!participantId) {
          return res.json({ status: 0 }).status(404);
        }
        const surveyService = Container.get(SurveyService);
        const { survey } = await surveyService.GetLatestSurvey(experimentId);
        const { surveyId, startDate } = survey;

        const surveyCompleted = await surveyService.GetSurveyCompletionStatus(
          participantId,
          surveyId
        );
        if (!surveyCompleted) {
          // status 2 = user hasn't submitted survey
          const surveyLink = `http://trials.massimmersionapproach.com/experiments/audiovssentencecards/surveys/${surveyId}`;
          return res.json({ status: 2, data: surveyLink }).status(401);
        }

        const ankiDataSubmitted = await surveyService.GetAnkiDataSubmissionStatus(
          participantId,
          surveyId
        );

        if (ankiDataSubmitted) {
          // status 3 = user already synced Anki data
          return res.json({ status: 3 }).status(404);
        } else {
          // status 1 = ready to sync Anki data
          return res.json({ status: 1, data: survey.cutoff }).status(200);
        }
        // get survey cutoff here; create get method on survey for startdate in cutoff format
        return res.json({ status: 1, data: survey.cutoff }).status(200); // surveyStatus = surveyCuttof here
      } catch (err) {
        return next(err);
      }
    }
  );

  route.post(
    '/latest',
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId } = req.params;
      logger.debug(
        `POST /experiments/${experimentId}/surveys/latest w/ body %o`,
        req.body
      );
      try {
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

  route.post(
    '/:surveyId',
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, surveyId } = req.params;
      logger.debug(
        `POST /experiments/${experimentId}/surveys/${surveyId} w/ body %o`,
        req.body
      );
      try {
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
