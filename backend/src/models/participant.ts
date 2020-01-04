import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType,
  AllowNull,
  HasMany,
  Unique,
  UpdatedAt,
  CreatedAt,
  DefaultScope,
  Scopes
} from 'sequelize-typescript';
import { Experiment } from './experiment';
import { ExperimentParticipant } from './intermediary/experimentParticipant';
import { CardCollection } from './cardCollection';
import { QuestionResponse } from './questionResponse';

const publicAttributes = [
  'participantId',
  'email',
  'name',
  'discordUsername',
  'age',
  'sex',
  'lastLogin'
];
@DefaultScope(() => ({
  attributes: publicAttributes
}))
@Scopes(() => ({
  public: {
    attributes: publicAttributes
  },
  private: {
    attributes: [
      'participantId',
      'email',
      'password',
      'name',
      'discordUsername',
      'age',
      'sex',
      'lastLogin'
    ]
  }
}))
@Table({ modelName: 'Participant', tableName: 'Participants' })
export class Participant extends Model<Participant> {
  @AllowNull(false)
  @Column({ type: DataType.STRING(255), primaryKey: true })
  participantId: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(60))
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  discordUsername: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
  age: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  sex: string;

  @AllowNull(false)
  @Column
  lastLogin: Date;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(
    () => Experiment,
    () => ExperimentParticipant,
    'participantId',
    'experimentId'
  )
  experiments: Experiment[];

  @HasMany(() => QuestionResponse, 'participantId')
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection, 'participantId')
  cardCollections: CardCollection[];
}
