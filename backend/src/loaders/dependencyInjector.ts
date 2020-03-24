import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { Client } from 'discord.js';

import logger from './logger';
import { PassportStatic } from 'passport';

export default async ({
  sqlConnection,
  discordClient,
  emailClient,
  passport
}: {
  sqlConnection: Sequelize;
  discordClient: Client;
  emailClient: any;
  passport: any;
}) => {
  try {
    for (const model of Object.entries(sqlConnection.models)) {
      Container.set(model[0], model[1]);
    }

    Container.set('sequelize', sqlConnection);
    Container.set('emailClient', emailClient);
    Container.set('discordClient', discordClient);
    Container.set('passport', passport);
    Container.set('logger', logger);
    logger.info('✌️ Logger injected into container');
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
