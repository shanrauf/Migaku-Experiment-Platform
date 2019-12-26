import { Sequelize } from 'sequelize-typescript';
import models from '../models';
import sequelizeConfig from '../config/sequelize';
import LoggerInstance from './logger';

export default async () => {
  const sequelizeOptions: any = {
    host: sequelizeConfig[process.env.NODE_ENV].host,
    dialect: 'mysql',
    port: sequelizeConfig[process.env.NODE_ENV].port,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  const sequelize = new Sequelize(
    sequelizeConfig[process.env.NODE_ENV].database,
    sequelizeConfig[process.env.NODE_ENV].username,
    sequelizeConfig[process.env.NODE_ENV].password,
    sequelizeOptions
  );

  sequelize.addModels([...models]);

  if (process.env.FORCE_SYNC) {
    await sequelize.sync({
      force: true
    });
  }

  return sequelize
    .authenticate()
    .then(() => {
      return sequelize;
    })
    .catch(err => {
      LoggerInstance.error('Unable to connect to the database:', err);
    });
};
