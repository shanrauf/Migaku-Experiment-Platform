// TODO: Write script to auto import all of these instead of manually doing it

import { ExperimentParticipant } from './experimentParticipant';
import { ExperimentRequirement } from './experimentRequirement';
import { SurveyQuestion } from './surveyQuestion';
import { SurveySectionQuestion } from './surveySectionQuestion';
import { ExperimentQuestion } from './experimentQuestion';

const intermediaryTables = [
  ExperimentParticipant,
  ExperimentRequirement,
  ExperimentQuestion,
  SurveyQuestion,
  SurveySectionQuestion
];

export default intermediaryTables;
