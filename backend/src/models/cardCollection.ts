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

@Table({ modelName: 'CardCollection', tableName: 'CardCollections' })
export class CardCollection extends Model<CardCollection> {
  @BelongsTo(() => Experiment, 'experimentId')
  experiment: Experiment;

  @BelongsTo(() => Survey, 'surveyId')
  survey: Survey;

  @BelongsTo(() => Participant, 'participantId')
  participant: Participant;

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

  @Column(DataType.JSON)
  cards: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
