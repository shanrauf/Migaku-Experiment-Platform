import { Request, Response, Router } from 'express';
import passport from 'passport';
import middlewares from '../middlewares';
import { Container } from 'typedi';
import ParticipantService from '../../services/participant';

const route = Router();

export default app => {
  app.use('/participants', route);

  route.post('/', (req: Request, res: Response) => res.status(201));

  route.delete('/', (req: Request, res: Response) => res.status(200));

  route.get('/', async (req: Request, res: Response) => {
    const participantService = Container.get(ParticipantService);
    const payload = await participantService.GetParticipants();
    if (!payload.participants) {
      return res.status(404).send('Not found');
    }
    return res.json(payload).status(200);
  });

  route.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    middlewares.ensureAuthenticated,
    (req: Request, res: Response) => res.json({ status: 'me' }).status(200)

    // return res.json({ user: req.user }).status(200);
  );
};
