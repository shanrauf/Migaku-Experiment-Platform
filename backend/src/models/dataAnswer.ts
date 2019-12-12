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
  @BelongsTo(() => DataQuestion, "dataQuestionId")
  dataQuestion: DataQuestion;

  @Column({ primaryKey: true })
  dataAnswerId: string;

  // foreign key
  @Column
  dataQuestionId: string;

  // foreign key
  @Column
  participantId: string;

  // foreign key
  @Column
  experimentId: string;

  // foreign key
  @Column
  surveyId: string;

  @Column(DataType.SMALLINT)
  answerSmallInt: number;

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
