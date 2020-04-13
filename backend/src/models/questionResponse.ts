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
  CreatedAt,
  DefaultScope,
  Scopes
} from 'sequelize-typescript';
import { Question } from './question';
import { Experiment } from './experiment';
import { Survey } from './survey';
import { Participant } from './participant';
import { SurveyResponse } from './surveyResponse';

// TODO: This used to protect data from ppl who weren't admins
// @DefaultScope(() => ({
//   attributes: [
//     'questionId',
//     'responseId',
//     'experimentId',
//     'surveyId',
//     'participantId'
//   ]
// }))
/* Dynamically query correct answer field using dataType
let dataType = capitalize("smallInt"); // "SmallInt"
return await QuestionResponse.scope(['defaultScope, `answer${dataType}`]).findAndCountAll();
*/
// @Scopes(() => ({
//   answerSmallInt: {
//     attributes: ['answerSmallInt']
//   },
//   answerInt: {
//     attributes: ['answerInt']
//   },
//   answerFloat: {
//     attributes: ['answerFloat']
//   },
//   answerBoolean: {
//     attributes: ['answerBoolean']
//   },
//   answerVarchar: {
//     attributes: ['answerVarchar']
//   },
//   answerText: {
//     attributes: ['answerText']
//   },
//   answerJSON: {
//     attributes: ['answerJSON']
//   }
// }))
@Table({ modelName: 'QuestionResponse', tableName: 'QuestionResponses' })
export class QuestionResponse extends Model<QuestionResponse> {
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true })
  id!: number;

  @ForeignKey(() => Question)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  questionId!: string;

  @ForeignKey(() => SurveyResponse)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  responseId!: string;

  @ForeignKey(() => Experiment)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  experimentId!: string;

  @ForeignKey(() => Survey)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  surveyId!: string;

  @ForeignKey(() => Participant)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  participantId!: string;

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
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

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
}
