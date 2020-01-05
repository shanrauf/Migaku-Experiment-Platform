import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType,
  AllowNull,
  HasMany,
  UpdatedAt,
  CreatedAt,
  DefaultScope,
  Scopes
} from 'sequelize-typescript';
import { Participant } from './participant';
import { ExperimentParticipant } from './intermediary/experimentParticipant';
import { Requirement } from './requirement';
import { ExperimentRequirement } from './intermediary/experimentRequirement';
import { Survey } from './survey';
import { CardCollection } from './cardCollection';
import { QuestionResponse } from './questionResponse';
import { ExperimentQuestion } from './intermediary/experimentQuestion';
import { Question } from './question';

@DefaultScope(() => ({
  attributes: [
    'experimentId',
    'title',
    'description',
    'startDate',
    'endDate',
    'visibility'
  ]
}))
@Scopes(() => ({
  public: {
    where: { visibility: 'public' }
  },
  private: {
    where: { visibility: 'private' }
  }
}))
@Table({ modelName: 'Experiment', tableName: 'Experiments' })
export class Experiment extends Model<Experiment> {
  @AllowNull(false)
  @Column({ type: DataType.STRING(255), primaryKey: true })
  experimentId: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @AllowNull(false)
  @Column
  startDate: Date;

  @AllowNull(true)
  @Column
  endDate: Date;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  visibility: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(
    () => Participant,
    () => ExperimentParticipant,
    'experimentId',
    'participantId'
  )
  participants: Participant[];

  @BelongsToMany(
    () => Question,
    () => ExperimentQuestion,
    'experimentId',
    'questionId'
  )
  questions: Question[];

  @BelongsToMany(
    () => Requirement,
    () => ExperimentRequirement,
    'experimentId',
    'requirementId'
  )
  requirements: Requirement[];

  @HasMany(() => Survey, 'experimentId')
  surveys: Survey[];

  @HasMany(() => QuestionResponse, 'experimentId')
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection)
  cardCollections: CardCollection[];
}
