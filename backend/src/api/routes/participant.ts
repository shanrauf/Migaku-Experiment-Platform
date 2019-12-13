import { Request, Response, Router } from "express";
import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/participants", route);

  route.post("/", (req: Request, res: Response) => {
    return res.status(201);
  });

  route.delete("/", (req: Request, res: Response) => {
    return res.status(200);
  });

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
