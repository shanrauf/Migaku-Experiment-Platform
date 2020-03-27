import { Container } from 'typedi';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
// import helmet from 'helmet';

import routes from '../api';
import config from '../config';
import logger from './logger';
import { PassportStatic } from 'passport';
import { handleError } from '../utils';

export default async ({ app }: { app: express.Application }): Promise<void> => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  /**
   * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc).
   * Shows the real origin IP in the heroku or Cloudwatch logs.
   */
  app.enable('trust proxy');

  /**
   * Middleware that transforms the raw string of req.body into json.
   */
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '1gb' // TODO: please start using streams or whatever XD
    })
  );
  app.use(express.json({ limit: '1gb' })); // TODO: please start using streams or whatever XD

  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [config.cookieKey]
    })
  );

  app.use(
    cookieParser({
      sameSite: true, // cookie can only be sent across our domain
      httpOnly: true // prevents client javascript from accessing cookie
      //  secure: true // TODO: cookie can only be transmitted over HTTPS
    })
  );

  const passport = Container.get<PassportStatic>('passport');
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Ignore occasional GET requests for favicon.ico
   */
  app.use((req, res, next) => {
    if (
      req.originalUrl &&
      req.originalUrl.split('/').pop().includes('favicon')
    ) {
      return res.sendStatus(204);
    }
    next();
  });

  // app.use(helmet());

  /**
   * Load API routes.
   */
  app.use(config.api.prefix, routes());

  /**
   * Catch 404 errors.
   */
  // app.use((req, res, next) => {
  //   next(new ErrorHandler(404, 'Not found.'));
  // });

  /**
   * Error handler middleware.
   */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
  logger.info('✌️ Express loaded');
};
