// TODO: Write script to auto import all of these instead of manually doing it

import { ExperimentParticipant } from "./experimentParticipant";
import { ExperimentRequirement } from "./experimentRequirement";
import { ExperimentSurvey } from "./experimentSurvey";
import { SurveyQuestion } from "./surveyQuestion";
import { SurveySectionQuestion } from "./surveySectionQuestion";

const intermediaryTables = [
  ExperimentParticipant,
  ExperimentSurvey,
  ExperimentRequirement,
  SurveyQuestion,
  SurveySectionQuestion
];

export default intermediaryTables;
