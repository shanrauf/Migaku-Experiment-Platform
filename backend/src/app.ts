import "reflect-metadata"; // We need this in order to use @Decorators

import config from "./config";

import express from "express";

import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  /**
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require("./loaders").default({ expressApp: app });

  app.listen(3000, err => {
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
