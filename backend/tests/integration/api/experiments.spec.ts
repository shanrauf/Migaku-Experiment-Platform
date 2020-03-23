import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import passportLoader from '../../../src/loaders/passport';
import discordLoader from '../../../src/loaders/discord';
import emailLoader from '../../../src/loaders/mailer';
import ExperimentService from '../../../src/api/routes/experiments/service';
import QuestionService from '../../../src/api/routes/questions/service';
import SurveyService from '../../../src/api/routes/surveys/service';
import { randomIdGenerator } from '../../../src/utils';
import ParticipantService from '../../../src/api/routes/participants/service';

beforeAll(async () => {
  await passportLoader();
  const sqlConnection = await sequelizeLoader();
  const discordClient = await discordLoader();
  const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient,
    emailClient
  });

  await sqlConnection.sync({
    force: true
  });
});

describe('GET /experiments', () => {
  afterAll(async () => {
    const sqlConnection = Container.get<Sequelize>('sequelize');
    await sqlConnection.sync({
      force: true
    });
  });
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const surveyService = Container.get(SurveyService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);

    try {
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

      await Promise.all([
        experimentService.CreateExperiment({
          experimentId: 'test-experiment-1',
          title: 'Test Experiment 1',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public',
          questions: ['test-question-1']
        }),
        experimentService.CreateExperiment({
          experimentId: 'test-experiment-2',
          title: 'Test Experiment 2',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public',
          questions: ['test-question-1']
        }),
        experimentService.CreateExperiment({
          experimentId: 'test-experiment-3',
          title: 'Test Experiment 3',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'private',
          questions: ['test-question-1']
        })
      ]);

      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-1'
      );
      await experimentService.RegisterParticipant(
        'test-experiment-2',
        'test-participant-1'
      );

      await Promise.all([
        surveyService.CreateSurvey({
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
        })
      ]);
    } catch (err) {
      throw err;
    }
  });

  it('Fetches all public experiments by default', async done => {
    const experimentService = Container.get(ExperimentService);
    try {
      const { experiments } = await experimentService.GetExperiments();
      expect(experiments.length).toBe(2);
      experiments.forEach(experiment => {
        expect(experiment.visibility).toEqual('public');
      });
      done();
    } catch (err) {
      done(err);
    }
  });

  it('Fetches the experiment that the survey (specified in the request query parameters) belongs to', async done => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      surveyId: 'test-survey-1'
    };

    try {
      const { experiments } = await experimentService.GetExperiments(
        requestQueryParams
      );
      expect(experiments.length).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('Fetches all experiments that the participant has registered for', async done => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      participantId: 'test-participant-1'
    };

    try {
      const { experiments } = await experimentService.GetExperiments(
        requestQueryParams
      );
      expect(experiments.length).toBe(2);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('Returns an empty array when there are no results', async done => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      experimentId: null,
      surveyId: null,
      participantId: null
    };

    try {
      /**
       * Impossible for an experiment to have a null experimentId
       */
      const { experiments } = await experimentService.GetExperiments(
        requestQueryParams
      );

      expect(experiments).toBeFalsy;
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('POST /experiments', () => {
  beforeAll(async () => {
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);

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
  });

  it('creates an experiment given just metadata like title, description, etc', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const result = await experimentService.GetExperiments();
      expect(result.experiments.length).toBe(0);

      await Promise.all([
        experimentService.CreateExperiment({
          experimentId: 'test-experiment-1',
          title: 'Test Experiment 1',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public'
        }),
        experimentService.CreateExperiment({
          experimentId: 'test-experiment-2',
          title: 'Test Experiment 2',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public'
        })
      ]);

      const { experiments } = await experimentService.GetExperiments();
      expect(experiments.length).toBe(2);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('creates an experiment and adds all questions in the request body to the experiment schema', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const nonexistentQuestions = await experimentService.GetExperimentQuestionSchema(
        'test-experiment-3'
      );
      expect(nonexistentQuestions.length).toBe(0);

      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-3',
        title: 'Test Experiment 3',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public',
        questions: ['test-question-1']
      });

      const questions = await experimentService.GetExperimentQuestionSchema(
        'test-experiment-3'
      );

      expect(
        questions.find(question => question.questionId === 'test-question-1')
      ).toBeTruthy;
      expect(
        questions.find(question => question.questionId === 'test-question-2')
      ).toBeFalsy;
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
