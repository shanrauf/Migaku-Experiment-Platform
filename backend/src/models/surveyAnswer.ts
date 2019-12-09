import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo
} from "sequelize-typescript";
import { SurveyQuestion } from "./surveyQuestion";
@Table
export class SurveyAnswer extends Model<SurveyAnswer> {
  @BelongsTo(() => SurveyQuestion)
  surveyQuestion: SurveyQuestion;

  @Column
  userId: string;

  @Column
  experimentId: string;

  @Column
  surveyId: string;

  @Column
  questionId: string;

  @Column(DataType.SMALLINT)
  answerSmallint: number;

  @Column
  answerInt: number;

  @Column(DataType.FLOAT)
  answerFloat: number;

  @Column
  answerBoolean: Boolean;

  @Column(DataType.TEXT) // change?
  answerVarchar: string;

  @Column(DataType.TEXT)
  answerText: string;
}
