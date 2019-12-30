import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  UpdatedAt,
  CreatedAt,
  HasMany
} from 'sequelize-typescript';
import { Experiment } from './experiment';
import { Survey } from './survey';
import { Participant } from './participant';
import { QuestionResponse } from './questionResponse';
import { CardCollection } from './cardCollection';
@Table({ modelName: 'SurveyResponse', tableName: 'SurveyResponses' })
export class SurveyResponse extends Model<SurveyResponse> {
  @BelongsTo(() => Experiment, 'experimentId')
  experiment: Experiment;

  @BelongsTo(() => Survey, 'surveyId')
  survey: Survey;

  @BelongsTo(() => Participant, 'participantId')
  participant: Participant;

  @HasMany(() => QuestionResponse, 'responseId')
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection, 'responseId')
  cardCollections: CardCollection[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
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

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
