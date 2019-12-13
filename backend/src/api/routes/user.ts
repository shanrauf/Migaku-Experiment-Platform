import { Request, Response, Router } from "express";
import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/users", route);

  route.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    middlewares.ensureAuthenticated,
    (req: Request, res: Response) => {
      return res.json({ status: "me" }).status(200);

      // return res.json({ user: req.user }).status(200);
    }
  );
};
