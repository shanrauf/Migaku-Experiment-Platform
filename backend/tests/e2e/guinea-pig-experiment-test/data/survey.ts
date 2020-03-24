import { testExperiment } from './experiment';
import { ICreateSurvey } from '@/api/routes/surveys/requests';
import { randomIdGenerator } from '@/utils';

const { experimentId } = testExperiment;

export const surveySchemaOne: ICreateSurvey = {
  experimentId,
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
      description: 'This survey literally just tells us your name...',
      questions: ['name']
    }
  ]
};

export const surveySchemaTwo: ICreateSurvey = {
  experimentId,
  surveyId: 'jyt5d61j5tfd1h3651td5h',
  title: 'MIA Survey 2',
  description: 'This is the 2nd survey of the experiment!',
  startDate: '2020-2-17 00:00:00',
  endDate: '2020-2-23 00:00:00',
  surveyCategory: 'regular',
  visibility: 'private',
  sections: [
    {
      sectionId: 'faoshefjkhasuefhasikhf',
      sectionNumber: 1,
      title: 'Basic Information',
      description:
        'This section is simply for us to identify who is filling out the survey.',
      questions: [
        'name',
        'email',
        'preferredCardType',
        'difficultyOfDailySentenceMining',
        'commentsAboutExperiment',
        'jcatScore'
      ]
    },
    {
      sectionId: '165ghdf1th5g1df515f3d',
      sectionNumber: 2,
      title: 'Immersion Stats',
      description:
        "This section will help us understand how you study Japanese. Don't feel bad if your answer to any of these questions is zero XD",
      questions: [
        'avgActiveListening',
        'avgPassiveListening',
        'avgReading',
        'activeListeningWithSubtitles',
        'daysOfActiveImmersionMissed',
        'daysOfReadingMissed'
      ]
    },
    {
      sectionId: 'l1h56j1dfh1t651h6df1gg',
      sectionNumber: 3,
      title: 'Audio Card Type',
      description:
        'This section is for us to understand your feelings about the card types we are testing.',
      questions: [
        'difficultyToLearnNewAudioCards',
        'difficultyToRememberLearnedAudioCards',
        'howEnjoyableIsReviewingAudioCards',
        'audioCardLeadsToUnderstandingInImmersion'
      ]
    },
    {
      sectionId: 'dxfgh486383b48fgxd63xg',
      sectionNumber: 4,
      description:
        'This section is for us to understand your feelings about the card types we are testing.',
      title: 'Sentence Card Type',
      questions: [
        'difficultyToLearnNewSentenceCards',
        'difficultyToRememberLearnedSentenceCards',
        'howEnjoyableIsReviewingSentenceCards',
        'sentenceCardsLeadsToUnderstandingInImmersion'
      ]
    }
  ]
};
