import { IQuestion } from "../questions/requests";
import { Expose } from "class-transformer";

export class ISurveyFilters {
  /**
   * Returns surveys that are associated with this experiment
   */
  @Expose()
  experimentId?: string;

  /**
   * Returns surveys that the participant has completed
   */
  @Expose()
  participantId?: string;

  /**
   * Returns surveys with this visibility status (default = "public"; NOTE: participants are only authenticated to request "public" surveys)
   */
  @Expose()
  visibility?: string;
}

export class ISurveyMetadata {
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
export class ISurveySectionMetadata {
  @Expose()
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

export class ISurveyStatus {
  @Expose()
  email!: string;
}

export class ISurvey {
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
  sections?: ISurveySection[];
}
export class ISurveySection {
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

export class ISurveyQuestions {
  [sectionNumber: number]: ISurveySection;
}
export class ISurveyQuestionList {
  /**
   * questionId[]
   */
  @Expose()
  questions: string[];
}

export class ISurveyResponse {
  @Expose()
  email?: string; // Legacy property for Anki route since no authentication... perhaps add auth

  @Expose()
  data: {
    [questionId: string]: string | number | object | Array<any> | null;
  };
}

export class ISurveyQuestionFilters {
  sectionNumber?: number;
}
