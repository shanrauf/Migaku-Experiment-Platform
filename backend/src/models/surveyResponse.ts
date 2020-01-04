import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  UpdatedAt,
  CreatedAt,
  HasMany,
  DefaultScope,
  AllowNull
} from 'sequelize-typescript';
import { Experiment } from './experiment';
import { Survey } from './survey';
import { Participant } from './participant';
import { QuestionResponse } from './questionResponse';
import { CardCollection } from './cardCollection';

@DefaultScope(() => ({
  attributes: [
    'responseId',
    'experimentId',
    'surveyId',
    'participantId',
    'createdAt', // would want to know when filled out
    'updatedAt' // in case want to know if updatedAt = createdAt a.k.a has response been editted
  ]
}))
@Table({ modelName: 'SurveyResponse', tableName: 'SurveyResponses' })
export class SurveyResponse extends Model<SurveyResponse> {
  @AllowNull(false)
  @Column({ type: DataType.STRING(255), primaryKey: true })
  responseId: string;

  @ForeignKey(() => Experiment)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Survey)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  surveyId: string;

  @ForeignKey(() => Participant)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  participantId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

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
}
