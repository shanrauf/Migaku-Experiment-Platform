import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import express from 'express';
import request from 'supertest';
import { Client } from 'discord.js';

import { allParticipants } from './data/participant';
import { surveySchemaOne, surveySchemaTwo } from './data/survey';
import { testExperiment } from './data/experiment';
import loaders from '../../../src/loaders';

const app = express();

beforeAll(async () => {
  await loaders({ expressApp: app });

  const sqlConnection = Container.get<Sequelize>('sequelize');
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

describe('A bunch of people discover MIA and want to partake in foreign language learning experiments', () => {
  test(`${allParticipants.length} participants create accounts on the site`, async done => {
    try {
      const result = await Promise.all(
        allParticipants.map(participant => {
          return request(app)
            .post(`/api/participants`)
            .send(participant)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
        })
      );
      expect(result.length).toBe(allParticipants.length);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Someone discovers that we are working on a new experiment and tries to register early', () => {
  test('participant is unable to register for a private experiment', async done => {
    try {
      const { participantId } = allParticipants[
        Math.floor(Math.random() * allParticipants.length)
      ];
      await request(app)
        .put(
          `/api/experiments/${testExperiment.experimentId}/participants/${participantId}`
        )
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('The experiment is finally revealed to the public', () => {
  test('The experiment becomes public', async done => {
    try {
      await request(app)
        .patch(`/api/experiments/${testExperiment.experimentId}`)
        .send({ visibility: 'public' })
        .expect(200);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('Everyone successsfully registers for the new experiment', async done => {
    try {
      const result = await Promise.all(
        allParticipants.map(participant => {
          return request(app)
            .put(
              `/api/experiments/${testExperiment.experimentId}/participants/${participant.participantId}`
            )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        })
      );
      expect(result.length).toBe(allParticipants.length);
      done();
    } catch (err) {
      done(err);
    }
  });
});

/**
 * TODO: Returning 200 intsead of 201...
 */
describe('An admin creates the initial survey for the experiment.', () => {
  test('Creates initial survey', async done => {
    try {
      await request(app)
        .post('/api/experiments/${testExperiment.experimentId}/surveys')
        .send(surveySchemaOne)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      done();
    } catch (err) {
      done(err);
    }
  });
});

afterAll(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  const discordClient = Container.get<Client>('discordClient');
  await sqlConnection.close();
  await discordClient.destroy();
});
