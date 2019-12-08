import { Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/users", route);

  route.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    // middlewares.attachCurrentUser,
    (req, res) => {
      return res.json({ user: req.user }).status(200);
    }
  );

  route.get("/surveyStatus", (req, res) => {
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
      return res.json({ status: 2, surveyLink });
    } else if (email == alreadySynced) {
      return res.json({ status: 3 }).status(200);
    } else {
      return res.json({ status: 4 }).status(401);
    }
  });
};
