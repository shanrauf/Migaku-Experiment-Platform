import { Request, Response, Router, NextFunction } from 'express';
import Container from 'typedi';
import SurveyService from '../../services/survey';
import ParticipantService from '../../services/participant';
const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use('/experiments/:experimentId/surveys', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.GetSurveys(req.params.experimentId);
      if (!payload.surveys) {
        return res.status(404).send('Not found');
      }
      return res.json(payload).status(200);
    } catch (err) {
      return next(err);
    }
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Creates a survey
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.CreateSurvey(
        req.params.experimentId,
        req.body.survey
      );
      if (!payload) {
        return res.send(401);
      }
      return res
        .json({ survey: payload.survey, status: 'Survey updated' })
        .status(200);
    } catch (err) {
      next(err); // handles the error, but reveals exactly wht the error was...
    }
  });

  route.get(
    '/latest',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('Here2');

        const { experimentId } = req.params;
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
      try {
        const { surveyId } = req.params;
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
    '/latest/status',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { experimentId } = req.params;
        const surveyService = Container.get(SurveyService);
        const payload = await surveyService.GetLatestSurvey(experimentId);
        if (!payload.survey) {
          return res.json(payload).status(404);
        }

        const { surveyId } = payload.survey;
        const { email } = req.query;
        // convert to partcipantId
        const participantService = Container.get(ParticipantService);
        const participantId = await participantService.GetParticipantIdByEmail(
          email
        );

        if (!participantId) {
          return res.json({ status: 0 }).status(404);
        }

        const surveyStatus = await surveyService.GetSurveyStatus(
          participantId,
          surveyId
        );

        // respond based on surveyStatus
        if (surveyStatus === 2) {
          const surveyLink = `http://trials.massimmersionapproach.com/experiments/audiovssentencecards/surveys/${surveyId}`;
          return res.json({ status: 2, data: surveyLink }).status(401);
        }
        if (surveyStatus === 3) {
          return res.json({ status: 3 }).status(404);
        }
        return res.json({ status: 1, data: surveyStatus }).status(200); // surveyStatus = surveyCuttof here
      } catch (err) {
        return next(err);
      }
    }
  );

  route.post(
    '/latest',
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('Request received');
      try {
        const { experimentId } = req.params;
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

        // get responseId from surveyId and participantId
        let responseId = await surveyService.GetSurveyResponseId(
          surveyId,
          participantId
        );
        console.log(responseId);

        // create one if doesn't exist
        if (!responseId) {
          responseId = await surveyService
            .CreateSurveyResponse(experimentId, surveyId, participantId)
            .then(response => response.responseId);
        }
        console.log(req.body.data); // undefined since lucas hasn't changed schema
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
      try {
        const { experimentId, surveyId } = req.params;
        const participantService = Container.get(ParticipantService);
        const participantId = await participantService.GetParticipantIdByEmail(
          req.body.email
        );

        // get responseId from surveyId and participantId
        const surveyService = Container.get(SurveyService);
        let responseId = await surveyService.GetSurveyResponseId(
          surveyId,
          participantId
        );
        console.log('Here');

        // create one if doesn't exist
        if (!responseId) {
          console.log('Here');

          responseId = await surveyService
            .CreateSurveyResponse(experimentId, surveyId, participantId)
            .then(response => response.responseId);
        }

        const payload = await surveyService.PostSurveyResponses(
          experimentId,
          surveyId,
          participantId,
          responseId,
          req.body.data
        );
        // if (!payload.questionResponses) {
        //   return res.json(payload).status(404);
        // }
        return res.json(payload).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );
};
