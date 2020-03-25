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
import QuestionResponseService from '../../../src/api/routes/questionresponses/service';

/**
 * Configure the database and dependencies before testing API routes
 */
beforeAll(async () => {
  // const passport = await passportLoader();
  const sqlConnection = await sequelizeLoader();
  // const discordClient = await discordLoader();
  // const emailClient = await emailLoader();

  await dependencyInjectorLoader({
    sqlConnection,
    discordClient: undefined,
    emailClient: undefined,
    passport: undefined
  });
});

describe('GET /questionresponses', () => {
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

  it('Fetches all question responses by default', async done => {
    const questionResponseService = Container.get(QuestionResponseService);

    try {
      const {
        questionresponses
      } = await questionResponseService.GetQuestionResponses();
      expect(questionresponses.length).toBe(1);
      done();
    } catch (err) {
      done(err);
    }
  });
});
