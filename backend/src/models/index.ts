import { ModelCtor } from "sequelize-typescript";

import { Participant } from "./participant";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
import { SurveyAnswer } from "./surveyAnswer";
import { SurveyQuestion } from "./surveyQuestion";
import { DataQuestion } from "./dataQuestion";
import { DataAnswer } from "./dataAnswer";
import { CardCollection } from "./cardCollection";
import { SurveySection } from "./surveySection";

// intermediary tables
import { ExperimentParticipant } from "./experimentParticipant";

const intermediaryTables = [ExperimentParticipant];

export const modelsArray: ModelCtor[] = [
  Participant,
  Experiment,
  Survey,
  SurveyAnswer,
  SurveySection,
  SurveyQuestion,
  DataQuestion,
  DataAnswer,
  CardCollection,
  ...intermediaryTables
];

export const modelsObject = {
  Participant,
  Experiment,
  Survey,
  SurveyAnswer,
  SurveySection,
  SurveyQuestion,
  DataQuestion,
  DataAnswer,
  CardCollection,
  ...intermediaryTables
};
