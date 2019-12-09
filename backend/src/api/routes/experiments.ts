import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/experiments", route);

  route.get(
    "/",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "experiment listings" }).status(200);
    }
  );

  route.post(
    "/",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      console.log(req.body);
      return res.json({ status: "experiment received" }).status(201);
    }
  );

  route.get(
    "/:experimentId",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "experiment info" }).status(200);
    }
  );
};
