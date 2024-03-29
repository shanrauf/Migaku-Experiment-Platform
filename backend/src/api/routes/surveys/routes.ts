import { ErrorHandler } from './../../../utils/index';
import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import SurveyService from './service';
import * as requests from './requests';
import middlewares from '../../middlewares';

/**
 * Converts /latest/responses to /:surveyId/responses, where surveyId = the latest survey in the experiment.
 */
/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
const convertLatestToSurveyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { experimentId } = req.params;
    const url = req.url.split('/'); // "/latestasdf" becomes ["", "latestasdf"]

    if (url[1] !== 'latest') {
      next();
    }
    const surveyService = Container.get(SurveyService);
    // when experiment has no surveys or experiment doesn't exist: Cannot destructure property `surveyId` of 'undefined' or 'null
    const { survey } = await surveyService.GetLatestSurvey(experimentId);
    const { surveyId } = survey;
    const restOfUrl = url.slice(2, url.length);

    // Mutating req.url so that next() forwards request to the appropriate handler
    req.url = `/${surveyId}/` + restOfUrl.join('/');
    next();
  } catch (err) {
    next(err);
  }
};

const route = Router({ mergeParams: true });

export default (app: Router): void => {
  app.use('/experiments/:experimentId/surveys', route);

  route.get(
    '/',
    middlewares.validateRequestSchema(requests.ISurveyFilters, undefined),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurveys(req.query);
        if (!payload.surveys) {
          return res.json(payload).status(404);
        }
        return res.json(payload).status(200);
      } catch (err) {
        next(err);
      }
    }
  );

  route.post(
    '/',
    // middlewares.validateRequestSchema(undefined, requests.ICreateSurvey),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const surveyService = Container.get(SurveyService);
        const { survey } = await surveyService.CreateSurvey(req.body);
        return res.status(201).json({ survey });
      } catch (err) {
        next(err);
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId, surveyId } = req.params;
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetSurvey(surveyId);
        if (payload.survey === null) {
          return res.status(404).json(payload);
        } else {
          return res.status(200).json(payload);
        }
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    '/:surveyId/responses',
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, surveyId } = req.params;
      res.redirect(
        `../../../../questionresponses?experimentId=${experimentId}&surveyId=${surveyId}`
      );
    }
  );

  route.post(
    '/:surveyId/responses',
    middlewares.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user.miaDiscord) {
          throw new ErrorHandler(403, "You aren't a part of the MIA Discord");
        }
        const { experimentId, surveyId } = req.params;
        const surveyService = Container.get(SurveyService);

        const responseId = await surveyService.GetSurveyCompletionStatus(
          req.user.participantId,
          surveyId
        );
        if (responseId) {
          /**
           * Delete their previous submission to allow for submitting again.
           * TODO: This and SubmitSurveyResponse aren't in a transaction, so
           * someone could delete their old submission, but then SubmitSurveyResponse
           * could error, resulting in no submission for the user...
           */
          await surveyService.DeleteSurveyResponse(responseId);
        }

        const questionResponses = await surveyService.SubmitSurveyResponse(
          experimentId,
          surveyId,
          req.user.participantId,
          req.user.discordId,
          req.body.data
        );
        return res.json(questionResponses).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );

  route.get(
    '/:surveyId/questions',
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
    async (req: Request, res: Response, next: NextFunction) => {
      const { experimentId, surveyId } = req.params;

      res.redirect(
        `../../../../questions?experimentId=${experimentId}&surveyId=${surveyId}`
      );
    }
  );
};
