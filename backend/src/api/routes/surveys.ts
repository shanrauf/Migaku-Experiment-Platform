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
};
