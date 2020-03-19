import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import SurveyService from './service';
import ParticipantService from '../participants/service';
import logger from '../../../loaders/logger';
import * as requests from './requests';
import middlewares from '../../middlewares';

/**
 * Given a url like /latest/responses, this finds the experiment's latest surveyId and forwards the API request.
 */
const convertLatestToSurveyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { experimentId } = req.params;
    logger.debug(`Finding the lastest surveyId for ${experimentId}`);
    const url = req.url.split('/'); // "/latestasdf" becomes ["", "latestasdf"]

    if (url[1] !== 'latest') {
      return next();
    }
    const surveyService = Container.get(SurveyService);
    // when experiment has no surveys or experiment doesn't exist: Cannot destructure property `surveyId` of 'undefined' or 'null
    const { survey } = await surveyService.GetLatestSurvey(experimentId);
    const { surveyId } = survey;
    const restOfUrl = url.slice(2, url.length);

    // Mutating req.url so that next() forwards request to the appropriate handler
    req.url = `/${surveyId}/` + restOfUrl.join('/');
    return next();
  } catch (err) {
    return next(err);
  }
};

const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use('/experiments/:experimentId/surveys', route);

  route.get(
    '/',
    middlewares.ensureAuthenticated,
    middlewares.ensureExperimentParticipant,
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
    '/',
    middlewares.ensureAuthenticated,
    middlewares.ensureExperimentParticipant,
    middlewares.validateRequestSchema(undefined, requests.ICreateSurvey),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug(`POST /surveys with body: %o`, req.body);
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.CreateSurvey(req.body);
        return res.status(200).json({ survey: req.body });
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );

  route.get('/latest*', convertLatestToSurveyId);
  route.post('/latest*', convertLatestToSurveyId);
  route.put('/latest*', convertLatestToSurveyId);
  route.delete('/latest*', convertLatestToSurveyId);

  route.get(
    '/:surveyId',
    // NOTE THIS CURRENTLY returns a paylaod with "surveySections" key; need to change that key to "sections"
    middlewares.ensureAuthenticated,
    middlewares.ensureExperimentParticipant,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId, surveyId } = req.params;
        logger.debug(`GET /experiments/${experimentId}/surveys/${surveyId}`);
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurvey(surveyId);
        if (payload.survey === null) {
          return res.status(404).json(payload);
        } else {
          return res.status(200).json(payload);
        }
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:surveyId/responses', // just redirect to questionresponses?surveyId...
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId, surveyId } = req.params;
        logger.debug(
          `GET /experiments/${experimentId}/surveys/${surveyId}/responses with query params: %o`,
          req.query
        );
        return res.status(200).json({});
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );

  route.post(
    '/:surveyId/responses',
    middlewares.ensureAuthenticated,
    middlewares.ensureExperimentParticipant,
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

        if (!participantId) {
          return res
            .json({
              errors: [`${req.body.email} isn't an existing participant`]
            })
            .status(404);
        }

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
          req.body.data,
          req.user.discordId
        );


        return res.json(questionResponses).status(200);
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );

  route.get(
    '/:surveyId/questions',
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, surveyId } = req.params;

      res.redirect(
        `../../../../questions?experimentId=${experimentId}&surveyId=${surveyId}`
      );
    }
  );
};
