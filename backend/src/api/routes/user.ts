import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/users", route);

  route.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ user: req.user }).status(200);
    }
  );

  route.get("/surveyStatus", (req: Request, res: Response) => {
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

  route.post("/survey", (req: Request, res: Response) => {
    console.log("Incoming POST request:");
    console.log(req.header("Content-Type"));
    console.log(req.body);
    // console.log(req.data);

    return res.json({ status: 1 }).status(200);
  });
};
