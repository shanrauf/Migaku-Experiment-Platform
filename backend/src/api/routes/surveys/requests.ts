import { IQuestion } from '../questions/requests';
import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsISO8601,
  IsString,
  ArrayUnique,
  ValidateNested,
  IsOptional,
  IsInt
} from 'class-validator';

export class ISurveyFilters {
  /**
   * Returns surveys that are associated with this experiment
   */
  @Expose()
  @IsOptional()
  @IsString()
  experimentId?: string;

  /**
   * Returns surveys that the participant has completed
   */
  @Expose()
  @IsOptional()
  @IsString()
  participantId?: string;

  /**
   * Returns surveys with this visibility status (default = "public"; NOTE: participants are only authenticated to request "public" surveys)
   */
  @Expose()
  @IsOptional()
  @IsString()
  visibility?: string;

  // /**
  //  * Returns the latest survey (the survey with the latest startDate)
  //  */
  // @Expose()
  // @IsOptional()
  // @IsString()
  // latest?: string;
}

export class ISurveyMetadata {
  @Expose()
  @IsDefined()
  @IsString()
  experimentId!: string;

  @Expose()
  @IsDefined()
  @IsString()
  surveyId!: string;

  @Expose()
  @IsDefined()
  @IsString()
  title!: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @Expose()
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @Expose()
  @IsDefined()
  @IsString()
  surveyCategory!: string;

  @Expose()
  @IsDefined()
  @IsString()
  visibility!: string;
}
export class ISurveySectionMetadata {
  @Expose()
  @IsDefined()
  @IsString()
  sectionId!: string;

  @Expose()
  @IsDefined()
  @IsInt()
  sectionNumber!: number;

  @Expose()
  @IsDefined()
  @IsString()
  title!: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  /**
   * questionId[] to create SurveyQuestions. Order of elements determines questionOrder in this section
   */
  @Expose()
  @IsDefined()
  @ArrayUnique()
  @IsString({
    each: true
  })
  questions: string[];
}

export class ISurveyStatus {
  /**
   * Legacy Anki implementation, since we currently cannot get participantId through Anki
   */
  @Expose()
  @IsOptional()
  @IsString()
  email!: string;

  /**
   * Preferred, secure method of identifying the participant
   */
  @Expose()
  @IsOptional()
  @IsString()
  participantId?: string;
}

export class ICreateSurvey extends ISurveyMetadata {
  /**
   * Contains questionId[] as opposed to full Question[], which is unnecessary on survey creation
   */
  @Expose()
  @IsDefined()
  sections!: ISurveySectionMetadata[];
}

export class ISurvey extends ISurveyMetadata {
  /**
   * Contains actual question metadata as opposed to a questionId[]
   */
  @Expose()
  @IsDefined()
  sections!: ISurveySection[];
}
export class ISurveySection {
  @Expose()
  @IsDefined()
  @IsString()
  sectionId: string;

  @Expose()
  @IsDefined()
  @IsString()
  sectionNumber: number;

  @Expose()
  @IsDefined()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsDefined()
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
  @IsDefined()
  @IsString({
    each: true
  })
  questions: string[];
}

export class IQuestionResponse {
  [questionId: string]: any;
}

export class ISurveyResponse {
  @Expose()
  @IsOptional()
  @IsString()
  email?: string; // Legacy property for Anki route since no authentication... perhaps add auth

  @Expose()
  data: IQuestionResponse;
}

export class ISurveyQuestionFilters {
  @IsOptional()
  @IsInt()
  sectionNumber?: number;
}
