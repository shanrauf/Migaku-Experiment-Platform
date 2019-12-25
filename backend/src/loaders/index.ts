import expressLoader from './express';
import sequelizeLoader from './sequelize';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import models from '../models';
import passportLoader from './passport';

export default async ({ expressApp }) => {
  const sqlConnection = await sequelizeLoader();
  Logger.info('✌️ DB loaded and connected!');

  const passport = await passportLoader();
  await dependencyInjectorLoader({
    sqlConnection,
    passport,
    models, // could use sqlConnection.model() to get models, but this will be easier to test
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  console.info('✌️ Express loaded');
};
