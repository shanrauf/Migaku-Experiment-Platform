import { IQuestion } from "../questions/requests";
import { Survey } from "../../../models/survey";
import { BaseResponse } from "../responses";
import { Expose } from "class-transformer";

export class ISurveys extends BaseResponse {
  @Expose()
  surveys: Survey[];

  @Expose()
  totalCount: number;
}

export class ISurvey extends BaseResponse {
  @Expose()
  survey: Survey;
}
export class ISurveySection extends BaseResponse {
  @Expose()
  sectionId: string;

  @Expose()
  sectionNumber: number;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  questions: IQuestion[];
}

export class ISurveyMetadata extends BaseResponse {
  @Expose()
  surveyId: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  startDate?: string;

  @Expose()
  endDate?: string;

  @Expose()
  surveyCategory?: string;

  @Expose()
  visibility?: string;

  @Expose()
  sections?: ISurveySectionMetadata[];
}
export class ISurveySectionMetadata extends BaseResponse {
  sectionId: string;

  @Expose()
  sectionNumber: number;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  /**
   * questionId[] to create SurveyQuestions
   */
  @Expose()
  questions: string[]; // change create survey method foor this part; previosuly would send full questions
}

/**
 * Status 0: E-mail doesn't exist
 *
 * Status 1: Ready to sync Anki data
 *
 * Status 2: Survey not completed
 *
 * Status 3: Anki data already synced
 */
export class ISurveyStatus extends BaseResponse {
  @Expose()
  status: 0 | 1 | 2 | 3;

  /**
   * Link to the incomplete survey OR the cutoff of the survey e.x "2019,9,15"
   */
  @Expose()
  data?: string;
}

/**
 * instead of generic types for questionValue, create or import sequelize value types (for validation)
 */
export class ISurveyResponse extends BaseResponse {
  // Decorators not valid here... will class-transformer work?
  [questionId: string]: string | number | object | Array<any> | null;
}

export class ISurveyResponses extends BaseResponse {
  @Expose()
  responses: ISurveyResponse[];
}

export class ISurveyQuestionList extends BaseResponse {
  /**
   * questionId[]
   */
  @Expose()
  questions: string[];
}
