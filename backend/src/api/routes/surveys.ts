import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
import SurveyService from "../../services/survey";
import Container from "typedi";
const route = Router({ mergeParams: true });

export default app => {
  app.use("/experiments/:experimentId/surveys", route);

  route.get("/", async (req: Request, res: Response) => {
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurveys(req.params.experimentId);
    if (!payload.surveys) {
      return res.status(404);
    }
    return res.json(payload).status(200);
  });

  route.post("/", (req: Request, res: Response) => {
    return res.status(403);

    // console.log(req.body);
    // return res.json({ status: "survey received" }).status(201);
  });

  route.put("/", (req: Request, res: Response) => {
    return res.status(403);
    // console.log("same as /create but with custom surveyId; ");
    // return res.json({ status: "survey received" }).status(201);
  });

  route.get("/latest", async (req: Request, res: Response) => {
    const { experimentId } = req.params;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetLatestSurvey(experimentId);
    if (!payload.survey) {
      return res.status(404);
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
    const payload = await surveyService.PostSurveyResponses(
      experimentId,
      surveyId,
      req.body
    );
    if (!payload.survey) {
      return res.status(404);
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

  route.post("/latest", (req: Request, res: Response) => {
    const surveyId = req.params.surveyId;
    const surveyService = Container.get(SurveyService);
    const payload = await surveyService.GetSurvey(surveyId);
    if (!payload.survey) {
      return res.status(404);
    }
    // now post all teh answers into questionResponses
    return res.json(payload).status(200);
  });

  route.get("/:surveyId/status", (req: Request, res: Response) => {
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

  route.get("/latest/status", (req: Request, res: Response) => {
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
