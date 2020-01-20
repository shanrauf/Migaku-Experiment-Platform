import { Router } from 'express';
import auth from './routes/auth';
import participant from './routes/participant';
import experiments from './routes/experiments';
import surveys from './routes/surveys';
import questionresponses from './routes/questionresponses';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  participant(app);
  experiments(app);
  surveys(app);
  questionresponses(app);

  return app;
};
