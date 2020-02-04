import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export interface IQuestion {
  questionId: string;
  label: string;
  questionType: string;
  dataType: string;
  rules: string;
  question: string;
  value: any;
  items?: string | any[];
  required: boolean;
  questionOrder?: number;
}

export interface IQuestionResponse {
  questionId: string;
  value: string;
  dataType: string;
}

export class IQuestionFilters {
  /**
   * Returns all questions administered by this experiment
   */
  @Expose()
  @IsString()
  experimentId?: string;

  /**
   * Returns all questions administered by this survey
   */
  @Expose()
  @IsString()
  surveyId?: string;

  /**
   * Returns all questions within this sectionNumber; this is tough cuz to you need the surveyId to get the sectionId from surveySectionModel, and with sectionId you get questionIds and questionOrders in surveySectionQuestionModel.
   */
  // @Expose()
  // sectionNumber?: string | number;
}
