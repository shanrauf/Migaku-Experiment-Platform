import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import experiments from "./routes/experiments";
import surveys from "./routes/surveys";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  experiments(app);
  surveys(app);

  return app;
};
