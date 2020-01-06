// import { Container } from 'typedi';

// import ExperimentService from '../../src/services/experiment';
// import LoggerInstance from '../../src/loaders/logger';
// import { IExperiment } from '../../src/interfaces/IExperiment';

// beforeAll(async done => {
//   let experimentModel = {
//     create: obj => {
//       return Promise.resolve({
//         ...obj
//       });
//     }
//   };
//   let experimentQuestionModel = {
//     bulkCreate: jest.fn(questions => questions)
//   };
//   let sqlConnection = {
//     transaction: jest.fn()
//   };
//   Container.set('Experiment', experimentModel);
//   Container.set('ExperimentQuestion', experimentQuestionModel);
//   Container.set('sequelize', sqlConnection);
//   Container.set('logger', LoggerInstance);
//   done();
// });

// describe('/experiments POST', () => {
//   it('can create an experiment', async () => {
//     const experimentService = Container.get<ExperimentService>(
//       ExperimentService
//     );
//     let obj: IExperiment = {
//       title: 'test',
//       description: 'Some experiment',
//       startDate: new Date(Date.now()),
//       visibility: 'public',
//       questions: ['abcd', '1234']
//     };
//     const { experiment } = await experimentService.CreateExperiment(obj);
//     expect(experiment).toEqual(obj);
//   });
// });
it('literally does nothing', () => {
  expect('nothing').toContain('nothing');
});
