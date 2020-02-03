import { IQuestion } from '../questions/requests';
import { BaseResponse } from '../responses';

export class ISurveysMetadata extends BaseResponse {
  surveys: ISurveyMetadata[];
}

export class ISurvey extends BaseResponse {
  surveyId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  surveyCategory?: string;
  visibility?: string;
  sections?: ISurveySection[];
}
export class ISurveySection extends BaseResponse {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;
  questions: IQuestion[];
}

export class ISurveyMetadata extends BaseResponse {
  surveyId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  surveyCategory?: string;
  visibility?: string;
  sections?: ISurveySectionMetadata[];
}
export class ISurveySectionMetadata extends BaseResponse {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;

  /**
   * questionId[] to create SurveyQuestions
   */
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
  status: 0 | 1 | 2 | 3;

  /**
   * Link to the incomplete survey OR the cutoff of the survey e.x "2019,9,15"
   */
  data?: string;
}
