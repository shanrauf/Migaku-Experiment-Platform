import { Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class QuestionResponseFilters {
  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  questionId?: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  experimentId?: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  responseId?: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  surveyId?: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  participantId?: string;

  @Expose()
  @IsOptional()
  filters: QuestionResponseFilter[];
}

export class QuestionResponseFilter {
  /**
   * The dataType of the questionId - we should get this ourselves from the question and not make the client provide it...
   */
  @Expose()
  @IsString()
  dataType: string;

  /**
   * QuestionId to filter by
   */
  @Expose()
  @IsString()
  questionId: string;

  /**
   * Specifies a SQL operator (like <=, >=, =, !=, etc)
   */
  @Expose()
  @IsString()
  operator: string;

  /**
   * Adds Op.not if true
   */
  @Expose()
  @IsString()
  not: boolean;
}
