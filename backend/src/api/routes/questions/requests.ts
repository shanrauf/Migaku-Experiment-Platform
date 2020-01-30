import { Expose } from "class-transformer";

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
  experimentId?: string;

  /**
   * Returns all questions administered by this survey
   */
  @Expose()
  surveyId?: string;
}
