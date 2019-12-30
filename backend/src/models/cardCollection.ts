import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  UpdatedAt,
  CreatedAt
} from 'sequelize-typescript';
import { Survey } from './survey';
import { Experiment } from './experiment';
import { Participant } from './participant';
import { SurveyResponse } from './surveyResponse';

@Table({ modelName: 'CardCollection', tableName: 'CardCollections' })
export class CardCollection extends Model<CardCollection> {
  @BelongsTo(() => Experiment, 'experimentId')
  experiment: Experiment;

  @BelongsTo(() => Survey, 'surveyId')
  survey: Survey;

  @BelongsTo(() => Participant, 'participantId')
  participant: Participant;

  @BelongsTo(() => SurveyResponse, 'responseId')
  surveyResponse: SurveyResponse;

  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true })
  id: number;

  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @ForeignKey(() => Participant)
  @Column(DataType.STRING(255))
  participantId: string;

  @ForeignKey(() => SurveyResponse)
  @Column(DataType.STRING(255))
  responseId: string;

  @Column(DataType.JSON)
  cards: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
