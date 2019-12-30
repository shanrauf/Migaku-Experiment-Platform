import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Experiment } from '../experiment';
import { Participant } from '../participant';
@Table({
  modelName: 'ExperimentParticipant',
  tableName: 'ExperimentParticipants'
})
export class ExperimentParticipant extends Model<ExperimentParticipant> {
  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Participant)
  @Column(DataType.STRING(255))
  participantId: string;

  @Column
  registerDate: Date;

  @AllowNull(true)
  @Column
  dropoutDate: Date; // can be null

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
