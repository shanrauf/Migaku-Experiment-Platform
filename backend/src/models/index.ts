import { ModelCtor } from "sequelize-typescript";

// TODO: Write script to auto import all of these instead of manually doing it
import { Participant } from "./participant";
import { Experiment } from "./experiment";
import { Requirement } from "./requirement";
import { Survey } from "./survey";
import { QuestionResponse } from "./questionResponse";
import { Question } from "./question";
import { CardCollection } from "./cardCollection";
import { SurveySection } from "./surveySection";

// intermediary tables
// TODO: Move all to a folder with index.js and only import that array
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

export const modelsArray: ModelCtor[] = [
  Participant,
  Experiment,
  Requirement,
  Survey,
  QuestionResponse,
  SurveySection,
  Question,
  CardCollection,
  ...intermediaryTables
];

export const modelsObject = {
  Participant,
  Experiment,
  Requirement,
  Survey,
  QuestionResponse,
  SurveySection,
  Question,
  CardCollection,
  ...intermediaryTables
};
