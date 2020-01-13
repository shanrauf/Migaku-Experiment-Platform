import { Request, Response, Router, NextFunction } from 'express';
import passport from 'passport';
import AuthService from '../../services/auth';
import middlewares from '../middlewares';

import {
  IParticipant,
  IParticipantSignupDTO
} from '../../interfaces/IParticipant';
import { Participant } from '../../models/participant';
import logger from '../../loaders/logger';

const route = Router();

export default app => {
  app.use('/auth', route);

  route.get('/discord', passport.authenticate('oauth2'));
  route.get(
    '/discord/redirect',
    passport.authenticate('oauth2'),
    (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug('GET /discord/redirect');
        return res.json({ user: req.user }).status(200);
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
