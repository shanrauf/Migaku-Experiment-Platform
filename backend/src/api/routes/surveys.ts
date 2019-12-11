import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
const route = Router({ mergeParams: true });

export default app => {
  app.use("/experiments/:experimentId/surveys", route);

  route.get(
    "/",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "survey listings" }).status(200);
    }
  );

  route.post(
    "/",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      console.log(req.body);
      return res.json({ status: "survey received" }).status(201);
    }
  );

  route.get(
    "/:surveyId",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.post(
    "/:surveyId",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.post(
    "/:surveyId/data",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      console.log("Incoming POST request:");
      console.log(req.header("Content-Type"));
      console.log(req.body);
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.post(
    "/latest/data",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      console.log("Incoming POST request:");
      console.log(req.header("Content-Type"));
      console.log(req.body);
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.get(
    "/latest",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      // find latest survey id and redirect too :/surveyId
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.post(
    "/latest",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      // find latest survey id and post to :/surveyId
      return res.json({ status: "survey info" }).status(200);
    }
  );

  route.get("/latest/status", (req: Request, res: Response) => {
    const email = req.query.email;
    console.log(email);
    // check if completed survey or already synced anki data
    let readyToSyncAnkiData = "ready@gmail.com";
    let surveyNotCompleted = "incomplete@gmail.com";
    let alreadySynced = "done@gmail.com";
    if (email == readyToSyncAnkiData) {
      // get survey cutoff
      let latestSurveyCutoff = "2019,12,07";
      return res.json({ status: 1, data: latestSurveyCutoff }).status(200);
    } else if (email == surveyNotCompleted) {
      let surveyLink = "https://patreon.com/massimmersionapproach";
      return res.json({ status: 2, data: surveyLink });
    } else if (email == alreadySynced) {
      return res.json({ status: 3 }).status(200);
    } else {
      // email doesn't exist
      return res.json({ status: 0 }).status(404);
    }
  });
};
