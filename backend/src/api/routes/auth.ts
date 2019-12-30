import { Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import Container from 'typedi';
import AuthService from '../../services/auth';
import middlewares from '../middlewares';

import {
  IParticipant,
  IParticipantSignupDTO
} from '../../interfaces/IParticipant';
import { Participant } from '../../models/participant';
import LoggerInstance from '../../loaders/logger';

const route = Router();

export default app => {
  const logger: any = Container.get('logger');
  app.use('/auth', route);

  route.post(
    '/signup',
    middlewares.continueIfNotAuthenticated,
    async (req: Request, res: Response, next) => {
      logger.info('Calling Sign-Up endpoint');
      try {
        const authServiceInstance = Container.get(AuthService);
        const {
          participant,
          token
        }: {
          participant: object;
          token: string;
        } = await authServiceInstance.SignUp(req.body as IParticipantSignupDTO);
        if (!participant) {
          return res.status(403).json({ participant, token });
        }
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        return res.status(201).json({ participant, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.post(
    '/signin',
    middlewares.continueIfNotAuthenticated,
    (req: Request, res: Response, next) => {
      logger.info('Calling Sign-In endpoint');
      try {
        passport.authenticate(
          'local',
          { session: false },
          async (err, participantRecord: Participant) => {
            if (err || !participantRecord) {
              return res.status(401).send({ participant: {}, token: '' });
            }
            const authServiceInstance = Container.get(AuthService);
            const { participant, token } = await authServiceInstance.SignIn(
              participantRecord.toJSON() as IParticipant
            );
            /** assign our jwt to the cookie */
            // res.cookie("jwt", token, { httpOnly: true, secure: true });
            res.cookie('jwt', token, { httpOnly: true });
            return res.status(200).send({ participant, token });
          }
        )(req, res);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   */
  route.post(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next) => {
      logger.info('Calling Sign-Out endpoint');
      try {
        return res.status(200).end();
      } catch (e) {
        logger.error('🔥 error %o', e);
        return next(e);
      }
    }
  );
};
