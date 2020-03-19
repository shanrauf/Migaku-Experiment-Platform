import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from '../api';
import config from '../config';
import passport from 'passport';
import cookieSession from 'cookie-session';
import logger from './logger';

export default async ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Middleware that transforms the raw string of req.body into json
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '1gb' // please start using streams or whatever XD
    })
  );
  app.use(express.json({ limit: '1gb' })); // please start using streams or whatever XD

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

  app.use(passport.initialize());
  app.use(passport.session());

  // Ignores occasional GET requests for favicon.ico
  app.use(function(req, res, next) {
    if (
      req.originalUrl &&
      req.originalUrl
        .split('/')
        .pop()
        .includes('favicon')
    ) {
      return res.sendStatus(204);
    }
    return next();
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  // app.use(errors()); Create error handler for validation errors

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    // err.status = 404; this doesn't work, so how do I indicate it's a 404?
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: [err.message]
    });
  });
  logger.info('✌️ Express loaded');
};
