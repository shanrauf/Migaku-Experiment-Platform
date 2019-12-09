import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
const route = Router();

export default app => {
  app.use("/experiments", route);

  route.get(
    "/:experiment",
    // middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ status: "test" }).status(200);
    }
  );
};
