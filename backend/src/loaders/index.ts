import expressLoader from './express';
import sequelizeLoader from './sequelize';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import passportLoader from './passport';

export default async ({ expressApp }) => {
  const sqlConnection = await sequelizeLoader();
  Logger.info('✌️ DB loaded and connected!');

  await passportLoader(); // put in Container ????

  await dependencyInjectorLoader({
    sqlConnection
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
