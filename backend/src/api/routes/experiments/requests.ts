import { IsISO8601, IsOptional, IsDefined, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { IQuestion } from "../questions/requests";

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
  description?: string;

  /**
   * ISO string (e.x "2019-12-14T13:19:44.000Z")
   */
  @Expose()
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
  experimentId?: string;

  /**
   * Returns experiments with this visibility
   */
  @Expose()
  visibility?: string;

  /**
   * Returns experiments that administered this survey
   */
  @Expose()
  surveyId?: string;

  /**
   * Returns experiments that the participant is registered for
   */
  @Expose()
  participantId?: string;
}

export class IExperimentParticipant {
  @Expose()
  @IsDefined()
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
