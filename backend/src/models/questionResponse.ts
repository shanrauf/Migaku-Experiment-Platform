import { DataType, Table, Column, Model } from "sequelize-typescript";
@Table
export class QuestionResponse extends Model<QuestionResponse> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  responseId: string;

  // @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;

  // @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  // @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  // @ForeignKey(() => Participant)
  @Column(DataType.STRING(255))
  participantId: string;

  @Column(DataType.SMALLINT)
  answerSmallInt: number;

  @Column(DataType.INTEGER)
  answerInt: number;

  @Column(DataType.FLOAT)
  answerFloat: number;

  @Column
  answerBoolean: Boolean;

  @Column(DataType.STRING(255))
  answerVarchar: string;

  @Column(DataType.TEXT)
  answerText: string;

  @Column(DataType.JSON)
  answerJSON: string;
}
