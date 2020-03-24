import { allParticipants, testExperiment } from './data';
import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import express from 'express';
import request from 'supertest';
import { Client } from 'discord.js';

// import loaders from '../../../src/loaders';
import expressLoader from '../../../src/loaders/express';
import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import passportLoader from '../../../src/loaders/passport';
import discordLoader from '../../../src/loaders/discord';

const app = express();

beforeAll(async () => {
  const passport = await passportLoader();
  const sqlConnection = await sequelizeLoader();
  const discordClient = await discordLoader();
  // const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient,
    emailClient: undefined,
    passport
  });

  await expressLoader({ app });
  // await loaders({ expressApp: app });
  await sqlConnection.sync({ force: true });
});

describe('An admin sets up the experiment.', () => {
  test('No experiments exist', async done => {
    try {
      await request(app)
        .get('/api/experiments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('An experiment is successfully created', async done => {
    try {
      const result = await request(app)
        .post('/api/experiments')
        .send(testExperiment)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      done();
    } catch (err) {
      done(err);
    }
  });
});

// describe('A bunch of people discover MIA and want to partake in experiments', () => {
//   test(`${allParticipants.length} participants successfully create accounts`, done => {
//     try {
//       const result = allParticipants.every(participant => {
//         return request(app)
//           .post('/api/participants')
//           .send(participant)
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(200);
//       });
//       expect(result).toBe(true);
//       done();
//     } catch (err) {
//       done(err);
//     }
//   });
// });

// describe('Someone discovers that we are working on a new experiment and tries to register early', () => {
//   test('participant is unable to register for a private experiment', async done => {
//     try {
//       const { participantId } = allParticipants[
//         Math.floor(Math.random() * allParticipants.length)
//       ];
//       request(app)
//         .put(
//           `/api/experiments/${testExperiment.experimentId}/participants/${participantId}`
//         )
//         .expect(200);
//       done();
//     } catch (err) {
//       done(err);
//     }
//   });
// });

// describe('The experiment is finally revealed to the public', () => {
//   test('The experiment becomes public', async done => {
//     try {
//       await request(app)
//         .patch(`/api/experiments/${testExperiment.experimentId}`)
//         .send({ visibility: 'public' })
//         .expect(200);
//       done();
//     } catch (err) {
//       done(err);
//     }
//   });
// });

// describe('Everyone decides they want to register for the new experiment', () => {
//   test('Everyone successsfully registers for the new experiment', async done => {
//     try {
//       const result = await allParticipants.every(participant =>
//         request(app)
//           .put(
//             `/api/experiments/${testExperiment.experimentId}/participants/${participant.participantId}`
//           )
//           .send(participant)
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(200)
//       );
//       expect(result).toBe(true);
//       done();
//     } catch (err) {
//       done(err);
//     }
//   });
// });

afterAll(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  const discordClient = Container.get<Client>('discordClient');
  await sqlConnection.close();
  await discordClient.destroy();
});
