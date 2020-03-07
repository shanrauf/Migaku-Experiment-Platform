import { Expose } from 'class-transformer';
import { IsString, IsDefined, IsBoolean } from 'class-validator';

export class IQuestion {
  @Expose()
  @IsString()
  questionId!: string;

  @Expose()
  @IsString()
  key!: string;

  @Expose()
  @IsString()
  label?: string;

  @Expose()
  @IsString()
  questionType!: string;

  @Expose()
  @IsString()
  dataType!: string;

  @Expose()
  @IsString()
  rules?: string;

  @Expose()
  @IsString()
  question!: string;

  @Expose()
  @IsString()
  items?: string;

  @Expose()
  @IsBoolean()
  required!: boolean;
}

export class ICreateQuestions {
  /**
   * Contains questionId[] as opposed to full Question[], which is unnecessary on survey creation
   */
  @Expose()
  @IsDefined()
  questions!: IQuestion[];
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
