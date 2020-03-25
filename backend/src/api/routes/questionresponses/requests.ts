import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class QuestionResponseFilters {
  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  key!: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  experimentId!: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  responseId!: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  surveyId!: string;

  /**
   * Identifier for a question
   */
  @Expose()
  @IsString()
  participantId!: string;
}
