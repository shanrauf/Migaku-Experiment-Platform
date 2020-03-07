import {
  IsISO8601,
  IsOptional,
  IsDefined,
  IsString,
  ValidateNested,
  IsInt
} from 'class-validator';
import { Expose } from 'class-transformer';
import { IQuestion } from '../questions/requests';

export class IExperiment {
  @Expose()
  @IsDefined()
  @IsString()
  experimentId!: string;

  @Expose()
  @IsDefined()
  @IsString()
  title!: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string | null;

  /**
   * ISO string (e.x "2019-12-14T13:19:44.000Z")
   */
  @Expose()
  @IsDefined()
  @IsISO8601()
  startDate!: string;

  /**
   * new Date().toISOString() -> "2019-12-14T13:19:44.000Z"
   */
  @Expose()
  @IsOptional()
  @IsISO8601()
  endDate?: string | null;

  @Expose()
  @IsDefined()
  @IsString()
  visibility!: string;

  /**
   * questionId[] to add to ExperimentQuestion table
   */
  @Expose()
  @IsOptional()
  @IsString({
    each: true
  })
  questions?: string[];

  /**
   * requirementId[]
   */
  @Expose()
  @IsOptional()
  @IsString({
    each: true
  })
  requirements?: string[];
}

export class IExperimentFilters {
  /**
   * Returns specific experiment
   */
  @Expose()
  @IsString()
  experimentId?: string;

  /**
   * Returns experiments with this visibility
   */
  @Expose()
  @IsString()
  visibility?: string;

  /**
   * Returns experiments that administered this survey
   */
  @Expose()
  @IsString()
  surveyId?: string;

  /**
   * Returns experiments that the participant is registered for
   */
  @Expose()
  @IsString()
  participantId?: string;
}

export class IExperimentParticipant {
  @Expose()
  @IsDefined()
  @IsString()
  experimentId!: string;

  @Expose()
  @IsDefined()
  participantId!: string;

  /**
   * new Date().toISOString() -> "2019-12-14T13:19:44.000Z"
   */
  @Expose()
  @IsDefined()
  @IsISO8601()
  registerDate!: string;

  /**
   * new Date().toISOString() -> "2019-12-14T13:19:44.000Z"
   */
  @Expose()
  @IsOptional()
  @IsISO8601()
  dropoutDate: string | null;
}

export class ISurvey {
  @Expose()
  @IsDefined()
  surveyId!: string;

  @Expose()
  @IsDefined()
  title!: string;

  @Expose()
  @IsOptional()
  description?: string | null;

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
  surveyCategory!: string;

  @Expose()
  @IsDefined()
  visibility!: string;

  @Expose()
  @IsDefined()
  sections!: ISurveySection[];
}
export class ISurveySection {
  @Expose()
  @IsDefined()
  sectionId: string;

  @Expose()
  @IsDefined()
  @IsInt()
  sectionNumber: number;

  @Expose()
  @IsDefined()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsDefined()
  questions: IQuestion[];
}
