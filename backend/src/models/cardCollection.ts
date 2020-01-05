import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  UpdatedAt,
  CreatedAt,
  DefaultScope,
  AllowNull
} from 'sequelize-typescript';
import { Survey } from './survey';
import { Experiment } from './experiment';
import { Participant } from './participant';
import { SurveyResponse } from './surveyResponse';

@DefaultScope(() => ({
  attributes: [
    'experimentId',
    'surveyId',
    'participantId',
    'responseId',
    'cards'
  ]
}))
@Table({ modelName: 'CardCollection', tableName: 'CardCollections' })
export class CardCollection extends Model<CardCollection> {
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true })
  id!: number;

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

  @ForeignKey(() => SurveyResponse)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  responseId!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  cards!: string;

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

  @BelongsTo(() => SurveyResponse, 'responseId')
  surveyResponse: SurveyResponse;
}
