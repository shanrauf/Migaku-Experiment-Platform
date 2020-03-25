import 'reflect-metadata'; // We need this in order to use @Decorators

import express from 'express';

import Logger from './loaders/logger';

async function startServer(): Promise<void> {
  const app = express();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  await require('./loaders').default({ expressApp: app });

  const port =
    process.env.NODE_ENV === 'production'
      ? parseInt(process.env.PORT, 10) || 80
      : 3000;
  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: 3000 🛡️
      ################################################
    `);
  });
}

startServer();
