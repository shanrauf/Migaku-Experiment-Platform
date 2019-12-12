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
import intermediaryTables from "./intermediary";

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

export const models = [
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
