import { Router } from 'express';
import auth from './routes/auth/routes';
import participant from './routes/participants/routes';
import experiments from './routes/experiments/routes';
import surveys from './routes/surveys/routes';
import questions from './routes/questions/routes';
import questionresponses from './routes/questionresponses/routes';

export default () => {
  const app = Router();
  auth(app);
  participant(app);
  experiments(app);
  surveys(app);
  questions(app);
  questionresponses(app);

  return app;
};
