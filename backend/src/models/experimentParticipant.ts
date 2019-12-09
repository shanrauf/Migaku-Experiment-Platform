import {
  ForeignKey,
  Table,
  Column,
  Model,
  HasMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Participant } from "./participant";
export class ExperimentParticipant extends Model<ExperimentParticipant> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => Participant)
  @Column
  participantId: number;
}
