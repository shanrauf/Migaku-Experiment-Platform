import { Request, Response, Router } from "express";
import SurveyService from "../../services/survey";
import ParticipantService from "../../services/participant";
import Container from "typedi";
const route = Router({ mergeParams: true });

export default app => {
  app.use("/experiments/:experimentId/surveys", route);

  route.get("/", async (req: Request, res: Response) => {
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurveys(req.params.experimentId);
    if (!payload.surveys) {
      return res.status(404).send("Not found");
    }
    return res.json(payload).status(200);
  });

  route.post("/", async (req: Request, res: Response) => {
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.CreateSurvey(
      req.params.experimentId,
      req.body.survey
    );
    if (!payload) {
      return res.send(401);
    }
    return res
      .json({ survey: payload.survey, status: "Survey updated" })
      .status(200);
  });

  route.put("/", async (req: Request, res: Response) => {
    const { survey } = req.body;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.UpdateSurvey(survey);
    if (!payload) {
      return res.send(401);
    }
    return res
      .json({ survey: payload.survey, status: "Survey updated" })
      .status(200);
  });

  route.get("/latest", async (req: Request, res: Response) => {
    const { experimentId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetLatestSurvey(experimentId);
    if (!payload.survey) {
      return res.json(payload).status(404);
    }
    return res.json(payload).status(200);
  });

  route.get("/:surveyId", async (req: Request, res: Response) => {
    const { surveyId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurvey(surveyId);
    if (!payload.survey) {
      return res.status(404);
    }
    return res.json(payload).status(200);
  });

  route.post("/:surveyId", async (req: Request, res: Response) => {
    const { experimentId, surveyId } = req.params;
    const surveyService = Container.get(SurveyService);

    const participantService = Container.get(ParticipantService);
    const participantId = await participantService.GetParticipantIdByEmail(
      req.body.email
    );
    console.log(participantId);

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

  route.patch("/:surveyId", async (req: Request, res: Response) => {
    // const surveyId = req.params.surveyId;
    // const surveyService = Container.get(SurveyService);
    // const payload = await surveyService.GetSurvey(surveyId);
    // if (!payload.survey) {
    //   return res.status(404);
    // }
    // return res.json(payload).status(200);
  });

  route.post("/latest", async (req: Request, res: Response) => {
    // const surveyId = req.params.surveyId;
    // const surveyService = Container.get(SurveyService);
    // const payload = await surveyService.GetSurvey(surveyId);
    // if (!payload.survey) {
    //   return res.status(404).send("Not found");
    // }
    // // now post all teh answers into questionResponses
    // return res.json(payload).status(200);
  });

  route.get("/:surveyId/status", async (req: Request, res: Response) => {
    const email = req.query.email;
    const surveyId = req.params.surveyId;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurvey(surveyId);
    if (!payload.survey) {
      return res.json(payload).status(404);
    }
    // check if email
    // if (email == readyToSyncAnkiData) {
    //   // get survey cutoff
    //   let latestSurveyCutoff = "2019,12,07";
    //   return res.json({ status: 1, data: latestSurveyCutoff }).status(200);
    // } else if (email == surveyNotCompleted) {
    //   let surveyLink = "https://patreon.com/massimmersionapproach";
    //   return res.json({ status: 2, data: surveyLink });
    // } else if (email == alreadySynced) {
    //   return res.json({ status: 3 }).status(200);
    // } else {
    //   // email doesn't exist
    //   return res.json({ status: 0 }).status(404);
    // }
  });

  route.get("/latest/status", async (req: Request, res: Response) => {
    const email = req.query.email;
    const surveyId = req.params.surveyId;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurvey(surveyId);
    if (!payload.survey) {
      return res.status(404);
    }
    // check if email
    // if (email == readyToSyncAnkiData) {
    //   // get survey cutoff
    //   let latestSurveyCutoff = "2019,12,07";
    //   return res.json({ status: 1, data: latestSurveyCutoff }).status(200);
    // } else if (email == surveyNotCompleted) {
    //   let surveyLink = "https://patreon.com/massimmersionapproach";
    //   return res.json({ status: 2, data: surveyLink });
    // } else if (email == alreadySynced) {
    //   return res.json({ status: 3 }).status(200);
    // } else {
    //   // email doesn't exist
    //   return res.json({ status: 0 }).status(404);
    // }
  });
  route.get(
    "/:surveyId/:sectionNumber",
    async (req: Request, res: Response) => {
      const surveyId = req.params.surveyId;
      const surveyService = Container.get(SurveyService);
      const payload = await surveyService.GetSurvey(surveyId);
      if (!payload.survey) {
        return res.status(404);
      }
      return res.json(payload).status(200);
    }
  );
};
