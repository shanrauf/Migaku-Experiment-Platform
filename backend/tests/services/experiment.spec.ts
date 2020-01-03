import { Container } from 'typedi';

import ExperimentService from '../../src/services/experiment';
import LoggerInstance from '../../src/loaders/logger';

beforeAll(async done => {
  let experimentModel = {
    create: obj => {
      // could generalize into a sequelize mocking library tbh
      return Promise.resolve({
        ...obj
      });
    }
  };
  Container.set('Experiment', experimentModel);
  Container.set('logger', LoggerInstance);
  done();
});

describe('/experiments POST', () => {
  it('can create an experiment', async () => {
    const experimentService = Container.get<ExperimentService>(
      ExperimentService
    );
    let obj = {
      title: 'test',
      description: 'Some experiment',
      startDate: new Date(Date.now()).toISOString(),
      visibility: 'public'
    };
    const { experiment } = await experimentService.CreateExperiment(obj);
    expect(experiment).toEqual(obj);
  });
});
