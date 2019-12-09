import { DataType, Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class SurveyAnswer extends Model<SurveyAnswer> {
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
