import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo
} from "sequelize-typescript";
import { Question } from "./question";
@Table
export class QuestionResponse extends Model<QuestionResponse> {
  @BelongsTo(() => Question, "responseId")
  question: Question;

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
