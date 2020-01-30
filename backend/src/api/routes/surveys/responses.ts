import { IQuestion } from "../questions/requests";
import { Survey } from "../../../models/survey";

export type ISurveys = {
  surveys: Survey[];
  totalCount: number;
};

export type ISurvey = {
  survey: Survey;
};
export type ISurveySection = {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;
  questions: IQuestion[];
};

export type ISurveyMetadata = {
  survey: Survey;
};

/**
 * Status 0: E-mail doesn't exist
 *
 * Status 1: Ready to sync Anki data
 *
 * Status 2: Survey not completed
 *
 * Status 3: Anki data already synced
 */
export type ISurveyStatus = {
  status: 0 | 1 | 2 | 3;

  /**
   * Link to the incomplete survey OR the cutoff of the survey e.x "2019,9,15"
   */
  data?: string;
};

/**
 * instead of generic types for questionValue, create or import sequelize value types (for validation)
 */
export type ISurveyResponse = {
  [questionId: string]: string | number | object | Array<any> | null;
};

export type ISurveyResponses = {
  responses: ISurveyResponse[];
};

export type ISurveyQuestionList = {
  /**
   * questionId[]
   */
  questions: string[];
};
