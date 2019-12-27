import { Request, Response, Router, NextFunction } from 'express';
import Container from 'typedi';
import SurveyService from '../../services/survey';
import ParticipantService from '../../services/participant';
const route = Router({ mergeParams: true });

export default app => {
  app.use('/experiments/:experimentId/surveys', route);

  route.get('/', async (req: Request, res: Response) => {
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurveys(req.params.experimentId);
    if (!payload.surveys) {
      return res.status(404).send('Not found');
    }
    return res.json(payload).status(200);
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // posting an actual survey
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

  route.put('/', async (req: Request, res: Response) => {
    const { survey } = req.body;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.UpdateSurvey(survey);
    if (!payload) {
      return res.send(401);
    }
    return res
      .json({ survey: payload.survey, status: 'Survey updated' })
      .status(200);
  });

  route.get('/latest', async (req: Request, res: Response) => {
    const { experimentId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetLatestSurvey(experimentId);
    if (!payload.survey) {
      return res.json(payload).status(404);
    }
    return res.json(payload).status(200);
  });

  route.get('/:surveyId', async (req: Request, res: Response) => {
    const { surveyId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurvey(surveyId);
    if (!payload.survey) {
      return res.status(404);
    }
    return res.json(payload).status(200);
  });

  route.get('/latest/status', async (req: Request, res: Response) => {
    const { experimentId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload: any = await surveyService.GetLatestSurvey(experimentId);
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

    const surveyStatus = await surveyService.GetSurveyStatus(
      participantId,
      surveyId
    );

    // respond based on surveyStatus
    if (surveyStatus === 2) {
      const surveyLink = 'https://patreon.com/massimmersionapproach';
      return res.json({ status: 2, data: surveyLink }).status(401);
    }
    if (surveyStatus === 3) {
      return res.json({ status: 3 }).status(404);
    }
    if (surveyStatus === 0) {
      // email doesn't exist
      return res.json({ status: 0 }).status(404);
    }
    return res.json({ status: 1, data: surveyStatus }).status(200);
  });

  route.post('/latest', async (req: Request, res: Response) => {
    const { experimentId } = req.params;
    const surveyService = Container.get(SurveyService);
    const latestSurvey: any = await surveyService.GetLatestSurvey(experimentId);
    if (!latestSurvey.survey) {
      return res.json(latestSurvey).status(404);
    }

    const { surveyId } = latestSurvey.survey;
    const { email } = req.body;

    // get participantId from email
    const participantService = Container.get(ParticipantService);
    const participantId = await participantService.GetParticipantIdByEmail(
      email
    );

    const dataPayload = req.body;
    Reflect.deleteProperty(dataPayload, 'email');

    return surveyService
      .PostAnkiData(experimentId, surveyId, participantId, dataPayload)
      .then(() => res.json({ status: 1 }).status(200));
  });

  route.post('/:surveyId', async (req: Request, res: Response) => {
    const { experimentId, surveyId } = req.params;
    const surveyService = Container.get(SurveyService);

    const participantService = Container.get(ParticipantService);
    const participantId = await participantService.GetParticipantIdByEmail(
      req.body.email
    );

    const payload = await surveyService.PostSurveyResponses(
      experimentId,
      surveyId,
      participantId,
      req.body.data
    );
    if (!payload.questionResponses) {
      return res.json(payload).status(200);
    }
    return res.json(payload).status(200);
  });

  // route.patch("/:surveyId", async (req: Request, res: Response) => {
  //   const surveyId = req.params.surveyId;
  //   const surveyService = Container.get(SurveyService);
  //   const payload = await surveyService.GetSurvey(surveyId);
  //   if (!payload.survey) {
  //     return res.status(404);
  //   }
  //   return res.json(payload).status(200);
  // });

  route.get(
    '/:surveyId/:sectionNumber',
    async (req: Request, res: Response) => {
      const { surveyId } = req.params;
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.GetSurvey(surveyId);
      if (!payload.survey) {
        return res.status(404);
      }
      return res.json(payload).status(200);
    }
  );
};
