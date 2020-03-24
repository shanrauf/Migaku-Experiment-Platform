import { ICreateSurvey } from '../../../src/api/routes/surveys/requests';
import { IExperiment } from '../../../src/api/routes/experiments/requests';
import { randomIdGenerator } from '../../../src/utils';
import { ParticipantSignup } from '../../../src/api/routes/participants/requests';

/**
 * 100 participants
 */
export const allParticipants: ParticipantSignup[] = [...Array(11)].map(() => {
  return {
    participantId: randomIdGenerator(),
    name: randomIdGenerator(),
    email: `${randomIdGenerator()}@test.com`,
    password: 'asdf',
    sex: 'male',
    age: 18,
    lastLogin: new Date(Date.now()).toISOString()
  };
});

export const testExperiment: IExperiment = {
  experimentId: randomIdGenerator(),
  title: 'Audio vs Sentence Cards',
  description:
    'This experiment seeks to compare differences in retention between audio and sentence cards.',
  visibility: 'public',
  startDate: new Date(Date.now()).toISOString(),
  endDate: null
};

export const initialSurvey: ICreateSurvey = {
  experimentId: testExperiment.experimentId,
  surveyId: randomIdGenerator(),
  title: 'Initial Survey',
  description: 'This is the initial survey',
  startDate: new Date(Date.now()).toISOString(),
  endDate: null,
  surveyCategory: 'initial',
  visibility: 'public',
  sections: [
    {
      sectionId: randomIdGenerator(),
      sectionNumber: 1,
      title: 'Section 1',
      description:
        'This survey hleps us better understand your current level of Japanese',
      questions: ['testQuestionOne']
    }
  ]
};
