import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { Question } from "./question";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
import { Participant } from "./participant";
@Table({ modelName: "QuestionResponse", tableName: "questionresponses" })
export class QuestionResponse extends Model<QuestionResponse> {
  @BelongsTo(() => Experiment, "experimentId")
  experiment: Experiment;

  @BelongsTo(() => Survey, "surveyId")
  survey: Survey;

  @BelongsTo(() => Participant, "participantId")
  participant: Participant;

  @BelongsTo(() => Question, "questionId")
  question: Question;

  @Column({ type: DataType.STRING(255), primaryKey: true })
  responseId: string;

  @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;

  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @ForeignKey(() => Participant)
  @Column(DataType.STRING(255))
  participantId: string;

  @AllowNull(true)
  @Column(DataType.SMALLINT)
  answerSmallInt: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  answerInt: number;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  answerFloat: number;

  @AllowNull(true)
  @Column
  answerBoolean: Boolean;

  @AllowNull(true)
  @Column(DataType.STRING(500))
  answerVarchar: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  answerText: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  answerJSON: string;
}
