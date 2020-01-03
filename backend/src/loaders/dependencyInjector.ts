import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import LoggerInstance from './logger';

export default async ({ sqlConnection }: { sqlConnection: Sequelize }) => {
  try {
    for (let model of Object.entries(sqlConnection.models)) {
      Container.set(model[0], model[1]);
    }

    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ Logger injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
