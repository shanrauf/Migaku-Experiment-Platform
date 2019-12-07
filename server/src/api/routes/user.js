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
    const { email } = req;
    // check if completed survey
    return res.json({ email }).status(200);
  });
};
