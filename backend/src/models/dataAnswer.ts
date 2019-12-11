import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo
} from "sequelize-typescript";
import { DataQuestion } from "./dataQuestion";
@Table
export class DataAnswer extends Model<DataAnswer> {
  // @BelongsTo(() => DataQuestion)
  // dataQuestion: DataQuestion;

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

  @Column(DataType.JSON)
  answerJSON: string;
}
