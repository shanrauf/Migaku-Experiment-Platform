import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import ExperimentService from '../../../src/api/routes/experiments/service';
import QuestionService from '../../../src/api/routes/questions/service';
import SurveyService from '../../../src/api/routes/surveys/service';
import { randomIdGenerator } from '../../../src/utils';
import ParticipantService from '../../../src/api/routes/participants/service';

/**
 * Configure the database and dependencies before testing API routes
 */
beforeAll(async () => {
  const sqlConnection = await sequelizeLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient: undefined,
    emailClient: undefined,
    passport: undefined
  });
});

describe('GET /experiments', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const surveyService = Container.get(SurveyService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
      lastLogin: new Date(Date.now()).toISOString()
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
  });

  it('Fetches all public experiments by default', async () => {
    const experimentService = Container.get(ExperimentService);

    const { experiments } = await experimentService.GetExperiments();
    expect(experiments).toHaveLength(2);
    experiments.forEach((experiment) => {
      expect(experiment.visibility).toEqual('public');
    });
  });

  it('Fetches the experiment that the survey (specified in the request query parameters) belongs to', async () => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      surveyId: 'test-survey-1'
    };

    const { experiments } = await experimentService.GetExperiments(
      requestQueryParams
    );
    expect(experiments).toHaveLength(1);
  });

  it('Fetches all experiments that the participant has registered for', async () => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      participantId: 'test-participant-1'
    };

    const { experiments } = await experimentService.GetExperiments(
      requestQueryParams
    );
    expect(experiments).toHaveLength(2);
  });

  it('Returns an empty array when there are no results', async () => {
    const experimentService = Container.get(ExperimentService);
    const requestQueryParams = {
      experimentId: null,
      surveyId: null,
      participantId: null
    };

    /**
     * Impossible for an experiment to have a null experimentId
     */
    const { experiments } = await experimentService.GetExperiments(
      requestQueryParams
    );

    expect(experiments).toHaveLength(0);
  });
});

describe('POST /experiments', () => {
  beforeAll(async () => {
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
      lastLogin: new Date(Date.now()).toISOString()
    });
  });

  it('creates an experiment given just metadata like title, description, etc', async () => {
    const experimentService = Container.get(ExperimentService);

    const result = await experimentService.GetExperiments();
    expect(result.experiments).toHaveLength(0);

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
    expect(experiments).toHaveLength(2);
  });

  it('creates an experiment and adds all questions in the request body to the experiment schema', async () => {
    const experimentService = Container.get(ExperimentService);

    const nonexistentQuestions = await experimentService.GetExperimentQuestionSchema(
      'test-experiment-3'
    );
    expect(nonexistentQuestions).toHaveLength(0);

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
      questions.find((question) => question.questionId === 'test-question-1')
    ).toBeTruthy();
    expect(
      questions.find((question) => question.questionId === 'test-question-2')
    ).toBeFalsy();
  });
});

describe('GET /experiments/:experimentId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
  });

  it('fetches the experiment by experimentId', async () => {
    const experimentService = Container.get(ExperimentService);

    const [result1, result2] = await Promise.all([
      await experimentService.GetExperiment('test-experiment-1'),
      await experimentService.GetExperiment(null)
    ]);
    expect(result1.experiment).toBeTruthy();
    expect(result2.experiment).toBeFalsy();
  });
});

describe('PATCH /experiments/:experimentId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

    await sqlConnection.sync({
      force: true
    });
    await experimentService.CreateExperiment({
      experimentId: 'test-experiment-1',
      title: 'Test Experiment 1',
      description: 'This is a test experiment.',
      startDate: '2020-03-23T08:00:00.000Z',
      endDate: null,
      visibility: 'private'
    });
  });

  it('updates the experiment', async () => {
    const experimentService = Container.get(ExperimentService);

    const { experiment } = await experimentService.UpdateExperiment(
      'test-experiment-1',
      {
        title: 'New title',
        visibility: 'public'
      }
    );
    expect(experiment.title).toBe('New title');
  });
});

describe('DELETE /experiments/:experimentId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const surveyService = Container.get(SurveyService);

    const sqlConnection = Container.get<Sequelize>('sequelize');

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
        lastLogin: new Date(Date.now()).toISOString()
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
  });

  it('deletes an experiment with no associated surveys, questions, etc', async () => {
    const experimentService = Container.get(ExperimentService);

    const [result1, result2] = await Promise.all([
      await experimentService.DeleteExperiment('test-experiment-2'),
      await experimentService.DeleteExperiment(null)
    ]);
    expect(result1.deletedCount).toBe(1);
    expect(result2.deletedCount).toBe(0);
  });

  it('deletes an experiment and all entities associated with it', async () => {
    const experimentService = Container.get(ExperimentService);

    const { deletedCount } = await experimentService.DeleteExperiment(
      'test-experiment-1'
    );
    expect(deletedCount).toBe(1);
  });
});

describe('PUT /experiments/:experimentId/participants/:participantId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
      lastLogin: new Date(Date.now()).toISOString()
    });
    await experimentService.CreateExperiment({
      experimentId: 'test-experiment-1',
      title: 'Test Experiment 1',
      description: 'This is a test experiment.',
      startDate: '2020-03-23T08:00:00.000Z',
      endDate: null,
      visibility: 'public'
    });
  });

  it('registers the participant for the experiment', async () => {
    const experimentService = Container.get(ExperimentService);

    const nonexistentParticipants = await experimentService.GetActiveParticipants(
      'test-experiment-1'
    );
    expect(nonexistentParticipants).toHaveLength(0);
    await experimentService.RegisterParticipant(
      'test-experiment-1',
      'test-participant-1'
    );
    const participants = await experimentService.GetActiveParticipants(
      'test-experiment-1'
    );
    expect(participants).toHaveLength(1);
  });
});

describe('DELETE /experiments/:experimentId/participants/:participantId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const participantService = Container.get(ParticipantService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
      lastLogin: new Date(Date.now()).toISOString()
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
  });

  it('drops the participant from the experiment', async () => {
    const experimentService = Container.get(ExperimentService);

    const participants = await experimentService.GetActiveParticipants(
      'test-experiment-1'
    );
    expect(participants).toHaveLength(1);
    await experimentService.DropParticipant(
      'test-experiment-1',
      'test-participant-1'
    );

    const nonexistentParticipants = await experimentService.GetActiveParticipants(
      'test-experiment-1'
    );
    expect(nonexistentParticipants).toHaveLength(0);
  });
});

describe('GET /experiments/:experimentId/questions', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
  });

  it('gets the question in the experiment schema', async () => {
    const experimentService = Container.get(ExperimentService);

    const questions = await experimentService.GetExperimentQuestionSchema(
      'test-experiment-1'
    );

    expect(questions).toHaveLength(1);
  });
});

describe('POST /experiments/:experimentId/questions', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const sqlConnection = Container.get<Sequelize>('sequelize');

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
  });

  it('adds the question to the experiment schema', async () => {
    const experimentService = Container.get(ExperimentService);

    await experimentService.AddQuestionsToExperimentSchema(
      'test-experiment-1',
      ['test-question-1']
    );

    const questions = await experimentService.GetExperimentQuestionSchema(
      'test-experiment-1'
    );
    expect(questions).toHaveLength(1);
  });
});

afterAll(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  await sqlConnection.close();
});
