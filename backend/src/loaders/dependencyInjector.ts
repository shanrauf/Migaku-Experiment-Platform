import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { Client } from 'discord.js';

import logger from './logger';

export default async ({
  sqlConnection,
  discordClient,
  emailClient
}: {
  sqlConnection: Sequelize;
  discordClient: Client;
  emailClient: any;
}) => {
  try {
    for (const model of Object.entries(sqlConnection.models)) {
      Container.set(model[0], model[1]);
    }

    Container.set('sequelize', sqlConnection);
    Container.set('emailClient', emailClient);
    Container.set('discordClient', discordClient);
    Container.set('logger', logger);
    logger.info('✌️ Logger injected into container');
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
