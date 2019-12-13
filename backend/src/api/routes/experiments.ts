import { Request, Response, Router } from "express";
// import middlewares from "../middlewares";
import passport from "passport";
import { Container } from "typedi";
import ExperimentService from "../../services/experiment";
const route = Router();

export default app => {
  app.use("/experiments", route);

  route.get("/", async (req: Request, res: Response) => {
    const experimentService = Container.get(ExperimentService);
    const payload = await experimentService.GetExperimentListings();
    if (!payload.experiments) {
      return res.status(404);
    }
    return res.json(payload).status(200);
  });

  route.post("/", (req: Request, res: Response) => {
    console.log(req.body);
    return res.json({ status: "experiment received" }).status(201);
  });

  route.get("/:experimentId", async (req: Request, res: Response) => {
    const experimentId = req.params.experimentId;
    const experimentService = Container.get(ExperimentService);
    const payload = await experimentService.GetExperiment(experimentId);
    if (!payload.experiment) {
      return res.status(404);
    }
    return res.json(payload).status(200);
  });
};
