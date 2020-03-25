import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';

import sequelizeLoader from '../../../src/loaders/sequelize';
import dependencyInjectorLoader from '../../../src/loaders/dependencyInjector';
import ExperimentService from '../../../src/api/routes/experiments/service';
import QuestionService from '../../../src/api/routes/questions/service';
import ParticipantService from '../../../src/api/routes/participants/service';
import SurveyService from '../../../src/api/routes/surveys/service';
import { randomIdGenerator } from '../../../src/utils';

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

describe('GET /experiments/:experimentId/surveys', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const surveyService = Container.get(SurveyService);
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
    await participantService.CreateParticipant({
      participantId: 'test-participant-2',
      age: 99,
      email: 'test2@test.com',
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
  });

  it('fetches all surveys', async () => {
    const surveyService = Container.get(SurveyService);

    const { surveys } = await surveyService.GetSurveys();
    expect(surveys).toHaveLength(2);
    expect(1).toBe(1);
  });

  it('fetches all surveys within an experiment given the experimentId filter', async () => {
    const surveyService = Container.get(SurveyService);
    const queryParameters = {
      experimentId: 'test-experiment-2'
    };

    const { surveys } = await surveyService.GetSurveys(queryParameters);
    expect(surveys).toHaveLength(1);
  });

  it('fetches all surveys that the participant specified as a filter has submitted', async () => {
    const surveyService = Container.get(SurveyService);
    const queryParametersOfParticipantWhoSubmitted = {
      participantId: 'test-participant-1'
    };

    const queryParameterOfParticipantWhoDidNotSubmit = {
      participantId: 'test-participant-2'
    };

    const { surveys } = await surveyService.GetSurveys(
      queryParametersOfParticipantWhoSubmitted
    );
    expect(surveys).toHaveLength(1);

    const nonexistentSurveys = await surveyService
      .GetSurveys(queryParameterOfParticipantWhoDidNotSubmit)
      .then((res) => res.surveys);
    expect(nonexistentSurveys).toHaveLength(0);
  });
});

describe('GET /experiments/:experimentId/surveys/:surveyId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const surveyService = Container.get(SurveyService);
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
      visibility: 'public',
      questions: ['test-question-1']
    });
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

  it('fetches the survey by surveyId', async () => {
    const surveyService = Container.get(SurveyService);

    const { survey } = await surveyService.GetSurvey('test-survey-1');
    expect(survey.surveyId).toBe('test-survey-1');
  });
});

describe('POST /experiments/:experimentId/surveys/:surveyId', () => {
  beforeAll(async () => {
    const experimentService = Container.get(ExperimentService);
    const questionService = Container.get(QuestionService);
    const participantService = Container.get(ParticipantService);
    const surveyService = Container.get(SurveyService);
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
    await experimentService.CreateExperiment({
      experimentId: 'test-experiment-1',
      title: 'Test Experiment 1',
      description: 'This is a test experiment.',
      startDate: '2020-03-23T08:00:00.000Z',
      endDate: null,
      visibility: 'public',
      questions: ['test-question-1']
    });
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

  /**
   * TODO: Query questionresponses to see if record exists in db.
   */
  it('accepts question responses', async () => {
    const surveyService = Container.get(SurveyService);
    const { questionResponses } = await surveyService.SubmitSurveyResponse(
      'test-experiment-1',
      'test-survey-1',
      'test-participant-1',
      null,
      {
        'test-question-1': randomIdGenerator()
      }
    );
    expect(questionResponses).toHaveLength(1);
  });

  it('rejects unknown question repsonses', async () => {
    const surveyService = Container.get(SurveyService);
    await expect(
      surveyService.SubmitSurveyResponse(
        'test-experiment-1',
        'test-survey-1',
        'test-participant-1',
        null,
        {
          'nonexistent-question': randomIdGenerator()
        }
      )
    ).rejects.toThrow();
  });
});

afterAll(async () => {
  const sqlConnection = Container.get<Sequelize>('sequelize');
  await sqlConnection.close();
});
