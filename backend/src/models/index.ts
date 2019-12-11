import { Participant } from "./participant";
import { Experiment } from "./experiment";
import { ExperimentParticipant } from "./experimentParticipant";
import { Survey } from "./survey";
import { SurveyAnswer } from "./surveyAnswer";
import { SurveyQuestion } from "./surveyQuestion";
import { DataQuestion } from "./dataQuestion";
import { DataAnswer } from "./dataAnswer";
import { Cards } from "./cards";
import { QuestionSection } from "./questionSection";

import { ModelCtor } from "sequelize-typescript";

export const modelsArray: ModelCtor[] = [
  Participant,
  Experiment,
  // ExperimentParticipant,
  Survey,
  SurveyAnswer,
  QuestionSection,
  SurveyQuestion,
  DataQuestion,
  DataAnswer,
  Cards
];

export const modelsObject = {
  Participant,
  Experiment,
  Survey,
  SurveyAnswer,
  SurveyQuestion,
  DataQuestion,
  DataAnswer,
  Cards
};
