import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  AllowNull,
  ForeignKey,
  AutoIncrement,
  UpdatedAt,
  CreatedAt
} from 'sequelize-typescript';
import { Question } from './question';
import { Experiment } from './experiment';
import { Survey } from './survey';
import { Participant } from './participant';
import { SurveyResponse } from './surveyResponse';
@Table({ modelName: 'QuestionResponse', tableName: 'QuestionResponses' })
export class QuestionResponse extends Model<QuestionResponse> {
  @BelongsTo(() => Experiment, 'experimentId')
  experiment: Experiment;

  @BelongsTo(() => Survey, 'surveyId')
  survey: Survey;

  @BelongsTo(() => Participant, 'participantId')
  participant: Participant;

  @BelongsTo(() => Question, 'questionId')
  question: Question;

  @BelongsTo(() => SurveyResponse, 'responseId')
  surveyResponse: SurveyResponse;

  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true })
  id: number;

  @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;

  @ForeignKey(() => SurveyResponse)
  @Column(DataType.STRING(255))
  responseId: string;

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
  answerBoolean: boolean;

  @AllowNull(true)
  @Column(DataType.STRING(500))
  answerVarchar: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  answerText: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  answerJSON: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
