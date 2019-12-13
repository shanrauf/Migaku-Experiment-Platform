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

  route.post("/", async (req: Request, res: Response) => {
    const experimentService = Container.get(ExperimentService);
    const payload = await experimentService.CreateExperiment(
      req.body.experiment
    );
    if (!payload.experiment) {
      return res.status(404);
    }
    return res.json({ experiment: payload.experiment }).status(201);
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

  route.put("/:experimentId", async (req: Request, res: Response) => {
    // custom experimentId
    return res.status(403);
  });

  route.delete("/:experimentId", async (req: Request, res: Response) => {
    return res.status(403);
  });
};
