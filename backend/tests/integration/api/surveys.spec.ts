test('test', () => {
  expect(1).toBe(1);
});
import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import passportLoader from '../../../src/loaders/passport';
import discordLoader from '../../../src/loaders/discord';
import emailLoader from '../../../src/loaders/mailer';
import ExperimentService from '../../../src/api/routes/experiments/service';
import QuestionService from '../../../src/api/routes/questions/service';
import ParticipantService from '../../../src/api/routes/participants/service';
import SurveyService from '../../../src/api/routes/surveys/service';
import { randomIdGenerator } from '../../../src/utils';

/**
 * Configure the database and dependencies before testing API routes
 */
beforeAll(async () => {
  await passportLoader();
  const sqlConnection = await sequelizeLoader();
  // const discordClient = await discordLoader();
  // const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient: undefined,
    emailClient: undefined
  });
});

describe('GET /experiments/:experimentId/surveys', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const surveyService = Container.get(SurveyService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    try {
      await sqlConnection.sync({
        force: true
      });
      await questionService.CreateQuestions([
        {
          questionId: 'test-question-1',
          key: 'test-question-1',
          questionType: 'text',
          dataType: 'varchar',
          required: true,
          question: 'test-question-1'
        }
      ]);
      await participantService.CreateParticipant({
        participantId: 'test-participant-1',
        age: 99,
        email: 'test@test.com',
        password: 'asdf',
        name: 'Shan Rauf',
        sex: 'male',
        lastLogin: new Date(Date.now())
      });
      await participantService.CreateParticipant({
        participantId: 'test-participant-2',
        age: 99,
        email: 'test2@test.com',
        password: 'asdf',
        name: 'Shan Rauf',
        sex: 'male',
        lastLogin: new Date(Date.now())
      });
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-1',
        title: 'Test Experiment 1',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public',
        questions: ['test-question-1']
      });
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-2',
        title: 'Test Experiment 2',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public',
        questions: ['test-question-1']
      });
      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-1'
      );
      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-2'
      );
      await surveyService.CreateSurvey({
        experimentId: 'test-experiment-1',
        surveyId: 'test-survey-1',
        title: randomIdGenerator(),
        description: randomIdGenerator(),
        startDate: new Date(Date.now()).toISOString(),
        endDate: new Date(Date.now()).toISOString(),
        surveyCategory: 'regular',
        visibility: 'public',
        sections: [
          {
            sectionId: randomIdGenerator(),
            sectionNumber: 1,
            title: randomIdGenerator(),
            description: randomIdGenerator(),
            questions: ['test-question-1']
          }
        ]
      });
      await surveyService.CreateSurvey({
        experimentId: 'test-experiment-2',
        surveyId: 'test-survey-2',
        title: randomIdGenerator(),
        description: randomIdGenerator(),
        startDate: new Date(Date.now()).toISOString(),
        endDate: new Date(Date.now()).toISOString(),
        surveyCategory: 'regular',
        visibility: 'public',
        sections: [
          {
            sectionId: randomIdGenerator(),
            sectionNumber: 1,
            title: randomIdGenerator(),
            description: randomIdGenerator(),
            questions: ['test-question-1']
          }
        ]
      });
      await surveyService.SubmitSurveyResponse(
        'test-experiment-1',
        'test-survey-1',
        'test-participant-1',
        null,
        {
          'test-question-1': randomIdGenerator()
        }
      );
    } catch (err) {
      throw err;
    }
  });

  it('fetches all surveys', async done => {
    const surveyService = Container.get(SurveyService);

    try {
      const { surveys } = await surveyService.GetSurveys();
      expect(surveys.length).toBe(2);
      expect(1).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('fetches all surveys within an experiment given the experimentId filter', async done => {
    const surveyService = Container.get(SurveyService);
    const queryParameters = {
      experimentId: 'test-experiment-2'
    };

    try {
      const { surveys } = await surveyService.GetSurveys(queryParameters);
      expect(surveys.length).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('fetches all surveys that the participant specified as a filter has submitted', async done => {
    const surveyService = Container.get(SurveyService);
    const queryParametersOfParticipantWhoSubmitted = {
      participantId: 'test-participant-1'
    };

    const queryParameterOfParticipantWhoDidNotSubmit = {
      participantId: 'test-participant-2'
    };

    try {
      const { surveys } = await surveyService.GetSurveys(
        queryParametersOfParticipantWhoSubmitted
      );
      expect(surveys.length).toBe(1);

      const nonexistentSurveys = await surveyService
        .GetSurveys(queryParameterOfParticipantWhoDidNotSubmit)
        .then(res => res.surveys);
      expect(nonexistentSurveys.length).toBe(0);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('POST /experiments/:experimentId/surveys', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    try {
      await sqlConnection.sync({
        force: true
      });
      await questionService.CreateQuestions([
        {
          questionId: 'test-question-1',
          key: 'test-question-1',
          questionType: 'text',
          dataType: 'varchar',
          required: true,
          question: 'test-question-1'
        }
      ]);
      await participantService.CreateParticipant({
        participantId: 'test-participant-1',
        age: 99,
        email: 'test@test.com',
        password: 'asdf',
        name: 'Shan Rauf',
        sex: 'male',
        lastLogin: new Date(Date.now())
      });
      await participantService.CreateParticipant({
        participantId: 'test-participant-2',
        age: 99,
        email: 'test2@test.com',
        password: 'asdf',
        name: 'Shan Rauf',
        sex: 'male',
        lastLogin: new Date(Date.now())
      });
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-1',
        title: 'Test Experiment 1',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public',
        questions: ['test-question-1']
      });
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-2',
        title: 'Test Experiment 2',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public',
        questions: ['test-question-1']
      });
    } catch (err) {
      throw err;
    }
  });

  it('creates a survey under experimentId', async done => {
    const surveyService = Container.get(SurveyService);
    try {
      await surveyService.CreateSurvey({
        experimentId: 'test-experiment-1',
        surveyId: 'test-survey-1',
        title: randomIdGenerator(),
        description: randomIdGenerator(),
        startDate: new Date(Date.now()).toISOString(),
        endDate: null,
        surveyCategory: 'regular',
        visibility: 'public',
        sections: [
          {
            sectionId: randomIdGenerator(),
            sectionNumber: 1,
            title: randomIdGenerator(),
            description: randomIdGenerator(),
            questions: ['test-question-1']
          }
        ]
      });
      const { survey } = await surveyService.GetSurvey('test-survey-1');
      expect(survey.surveyId).toBe('test-survey-1');
      done();
    } catch (err) {
      done(err);
    }
  });

  it('prevents adding a question to a survey that is not in the experiment schema', async done => {
    const surveyService = Container.get(SurveyService);

    try {
      expect(
        surveyService.CreateSurvey({
          experimentId: 'test-experiment-1',
          surveyId: 'test-survey-3',
          title: randomIdGenerator(),
          description: randomIdGenerator(),
          startDate: new Date(Date.now()).toISOString(),
          endDate: new Date(Date.now()).toISOString(),
          surveyCategory: 'regular',
          visibility: 'public',
          sections: [
            {
              sectionId: randomIdGenerator(),
              sectionNumber: 1,
              title: randomIdGenerator(),
              description: randomIdGenerator(),
              questions: ['test-question-2']
            }
          ]
        })
      ).rejects.toThrow();
      done();
    } catch (err) {
      done(err);
    }
  });
});

afterAll(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  await sqlConnection.close();
});
