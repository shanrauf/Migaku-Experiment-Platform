import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import passportLoader from '../../../src/loaders/passport';
// import discordLoader from '../../../src/loaders/discord';
// import emailLoader from '../../../src/loaders/mailer';
import ExperimentService from '../../../src/api/routes/experiments/service';
import QuestionService from '../../../src/api/routes/questions/service';
import SurveyService from '../../../src/api/routes/surveys/service';
import { randomIdGenerator } from '../../../src/utils';
import ParticipantService from '../../../src/api/routes/participants/service';

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

describe('GET /experiments', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const surveyService = Container.get(SurveyService);
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
    } catch (err) {
      throw err;
    }
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
      ).toBeTruthy();
      expect(
        questions.find(question => question.questionId === 'test-question-2')
      ).toBeFalsy();
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('GET /experiments/:experimentId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    try {
      await sqlConnection.sync({
        force: true
      });
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-1',
        title: 'Test Experiment 1',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public'
      });
    } catch (err) {
      throw err;
    }
  });

  it('fetches the experiment by experimentId', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const [result1, result2] = await Promise.all([
        await experimentService.GetExperiment('test-experiment-1'),
        await experimentService.GetExperiment(null)
      ]);
      expect(result1.experiment).toBeTruthy();
      expect(result2.experiment).toBeFalsy();
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('DELETE /experiments/:experimentId', () => {
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
      await Promise.all([
        questionService.CreateQuestions([
          {
            questionId: 'test-question-1',
            key: 'test-question-1',
            questionType: 'text',
            dataType: 'varchar',
            required: true,
            question: 'test-question-1'
          }
        ]),
        participantService.CreateParticipant({
          participantId: 'test-participant-1',
          age: 99,
          email: 'test@test.com',
          password: 'asdf',
          name: 'Shan Rauf',
          sex: 'male',
          lastLogin: new Date(Date.now())
        })
      ]);
      await Promise.all([
        await experimentService.CreateExperiment({
          experimentId: 'test-experiment-1',
          title: 'Test Experiment 1',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public',
          questions: ['test-question-1']
        }),
        await experimentService.CreateExperiment({
          experimentId: 'test-experiment-2',
          title: 'Test Experiment 2',
          description: 'This is a test experiment.',
          startDate: '2020-03-23T08:00:00.000Z',
          endDate: null,
          visibility: 'public',
          questions: ['test-question-1']
        })
      ]);

      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-1'
      );

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
    } catch (err) {
      throw err;
    }
  });

  it('deletes an experiment with no associated surveys, questions, etc', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const [result1, result2] = await Promise.all([
        await experimentService.DeleteExperiment('test-experiment-2'),
        await experimentService.DeleteExperiment(null)
      ]);
      expect(result1.deletedCount).toBe(1);
      expect(result2.deletedCount).toBe(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('deletes an experiment and all entities associated with it', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const { deletedCount } = await experimentService.DeleteExperiment(
        'test-experiment-1'
      );
      expect(deletedCount).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('PUT /experiments/:experimentId/participants/:participantId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    try {
      await sqlConnection.sync({
        force: true
      });
      await participantService.CreateParticipant({
        participantId: 'test-participant-1',
        age: 99,
        email: 'test@test.com',
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
        visibility: 'public'
      });
    } catch (err) {
      throw err;
    }
  });

  it('registers the participant for the experiment', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const nonexistentParticipants = await experimentService.GetActiveParticipants(
        'test-experiment-1'
      );
      expect(nonexistentParticipants.length).toBe(0);
      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-1'
      );
      const participants = await experimentService.GetActiveParticipants(
        'test-experiment-1'
      );
      expect(participants.length).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('DELETE /experiments/:experimentId/participants/:participantId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    try {
      await sqlConnection.sync({
        force: true
      });
      await participantService.CreateParticipant({
        participantId: 'test-participant-1',
        age: 99,
        email: 'test@test.com',
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
        visibility: 'public'
      });
      await experimentService.RegisterParticipant(
        'test-experiment-1',
        'test-participant-1'
      );
    } catch (err) {
      throw err;
    }
  });

  it('drops the participant from the experiment', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const participants = await experimentService.GetActiveParticipants(
        'test-experiment-1'
      );
      expect(participants.length).toBe(1);
      await experimentService.DropParticipant(
        'test-experiment-1',
        'test-participant-1'
      );

      const nonexistentParticipants = await experimentService.GetActiveParticipants(
        'test-experiment-1'
      );
      expect(nonexistentParticipants.length).toBe(0);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('GET /experiments/:experimentId/questions', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
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
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-1',
        title: 'Test Experiment 1',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public'
      });
      await experimentService.AddQuestionsToExperimentSchema(
        'test-experiment-1',
        ['test-question-1']
      );
    } catch (err) {
      throw err;
    }
  });

  it('gets the question in the experiment schema', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      const questions = await experimentService.GetExperimentQuestionSchema(
        'test-experiment-1'
      );

      expect(questions.length).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('POST /experiments/:experimentId/questions', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
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
      await experimentService.CreateExperiment({
        experimentId: 'test-experiment-1',
        title: 'Test Experiment 1',
        description: 'This is a test experiment.',
        startDate: '2020-03-23T08:00:00.000Z',
        endDate: null,
        visibility: 'public'
      });
    } catch (err) {
      throw err;
    }
  });

  it('adds the question to the experiment schema', async done => {
    const experimentService = Container.get(ExperimentService);

    try {
      await experimentService.AddQuestionsToExperimentSchema(
        'test-experiment-1',
        ['test-question-1']
      );

      const questions = await experimentService.GetExperimentQuestionSchema(
        'test-experiment-1'
      );
      expect(questions.length).toBe(1);
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
