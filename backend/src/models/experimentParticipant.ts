import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Participant } from "./participant";
@Table
export class ExperimentParticipant extends Model<ExperimentParticipant> {
  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Participant)
  @Column(DataType.STRING(255))
  participantId: string;

  @Column
  registerDate: Date;

  @Column
  dropoutDate: Date; // can be null
}
