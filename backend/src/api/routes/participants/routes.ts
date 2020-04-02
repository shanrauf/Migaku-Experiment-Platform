import { Request, Response, Router, NextFunction } from 'express';
import { Container } from 'typedi';

import ParticipantService from './service';
import validateRequestSchema from '../../middlewares/validateRequestSchema';
import * as requests from './requests';
import middlewares from '../../middlewares';
import DiscordClient from '../../../services/discord/discord';

const route = Router();

export default (app) => {
  app.use('/participants', route);

  route.get(
    '/',
    validateRequestSchema(requests.ParticipantFilters, null),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const participantService = Container.get(ParticipantService);
        const payload = await participantService.GetParticipants(req.query);
        if (!payload.participants) {
          return res.status(404).json({ message: 'Not found' });
        }
        return res.json(payload).status(200);
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    '/me',
    middlewares.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user.discordUsername) {
        return res.status(403).json({ status: 'error' });
      }
      return res.status(200).json({
        miaDiscord: req.user.miaDiscord,
        discordUsername: req.user.discordUsername
      });
    }
  );

  route.get(
    '/deletethis',
    async (req: Request, res: Response, next: NextFunction) => {
      const discordService = Container.get(DiscordClient);
      await discordService.CreateEmojis();
      return res.status(200).json({ status: 'success' });
    }
  );

  route.post(
    '/',
    validateRequestSchema(undefined, requests.ParticipantSignup),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const participantService = Container.get(ParticipantService);
        const participant = await participantService.CreateParticipant(
          req.body as requests.ParticipantSignup
        );

        return res.status(201).json({ participant });
      } catch (err) {
        next(err);
      }
    }
  );

  route.get(
    '/:participantId/experiments',
    async (req: Request, res: Response, next: NextFunction) => {
      res.redirect(
        `../../experiments?participantId=${req.params.participantId}`
      );
    }
  );
};
