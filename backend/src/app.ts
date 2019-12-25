import 'reflect-metadata'; // We need this in order to use @Decorators

import express from 'express';
import config from './config';


import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  /**
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   * */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  await require('./loaders').default({ expressApp: app });

  app.listen(3000, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: 3000 🛡️
      ################################################
    `);
  });
}

startServer();
