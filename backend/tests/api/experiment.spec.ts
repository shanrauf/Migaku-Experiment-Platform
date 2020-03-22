import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../src/loaders/dependencyInjector';
// import passportLoader from '../src/loaders/passport';
import discordLoader from '../../src/loaders/discord';
import emailLoader from '../../src/loaders/mailer';
import ExperimentService from '../../src/api/routes/experiments/service';

beforeAll(async () => {
  // await passportLoader();
  const sqlConnection = await sequelizeLoader();
  const discordClient = await discordLoader();
  const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient,
    emailClient
  });
});

beforeEach(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  await sqlConnection.sync({
    force: true
  });
});

describe('GET /experiments', () => {
  test('Returns experiments and does not crash', async () => {
    const experimentService = Container.get(ExperimentService);
    const experiments = await experimentService.GetExperiments();
    expect(experiments.experiments).toBeTruthy();
  });
});
