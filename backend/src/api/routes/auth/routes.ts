import { Container } from 'typedi';
import { Request, Response, Router, NextFunction } from 'express';
import middlewares from '../../middlewares';
import { PassportStatic } from 'passport';

const route = Router();

export default (app: Router) => {
  const passport = Container.get<PassportStatic>('passport');

  app.use('/auth', route);

  route.get(
    '/discord',
    middlewares.sanitizeRedirectUrl,
    (req: Request, res: Response, next: NextFunction) => {
      /**
       * Allowing an optional redirect url to be passed.
       * Otherwise, /discord/redirect responds with JSON
       */
      const state =
        'redirect' in req.query ? `redirect=${req.query.redirect}` : null;
      const authenticator = passport.authenticate('oauth2', { state });
      return authenticator(req, res, next);
    }
  );

  route.get(
    '/discord/redirect',
    passport.authenticate('oauth2'),
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.query.state?.includes('redirect')) {
          const redirectUrl = decodeURIComponent(req.query.state.split('=')[1]);
          res.status(301).redirect(redirectUrl);
        } else {
          const { miaDiscord, discordUsername } = req.user;
          res.status(200).json({ miaDiscord, discordUsername });
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
