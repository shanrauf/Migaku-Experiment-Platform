import { Request, Response, Router, NextFunction } from 'express';
import passport from 'passport';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import ParticipantService from '../../services/participant';

const route = Router();

export default app => {
  app.use('/participants', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const participantService = Container.get(ParticipantService);
      const payload = await participantService.GetParticipants();
      if (!payload.participants) {
        return res.status(404).send('Not found');
      }
      return res.json(payload).status(200);
    } catch (err) {
      return next(err);
    }
  });
};
