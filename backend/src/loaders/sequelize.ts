import { Sequelize } from 'sequelize-typescript';
import models from '../models';
import sequelizeConfig from '../config/sequelize';
import mysql2 from 'mysql2';
import logger from './logger';

export default async (): Promise<Sequelize> => {
  const sqlConnection = new Sequelize(
    sequelizeConfig[process.env.NODE_ENV].database,
    sequelizeConfig[process.env.NODE_ENV].username,
    sequelizeConfig[process.env.NODE_ENV].password,
    {
      host: sequelizeConfig[process.env.NODE_ENV].host,
      dialect: 'mysql',
      dialectModule: mysql2,
      port: sequelizeConfig[process.env.NODE_ENV].port,
      logging: false,
      pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000
      }
    }
  );

  sqlConnection.addModels([...models]);

  sqlConnection
    .authenticate()
    .then(() => logger.info('DB authenticated'))
    .catch((err) => {
      logger.error('Unable to connect to the database:', err);
    });
  logger.info('✌️ DB loaded and connected!');

  return sqlConnection;
};
