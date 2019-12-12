import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Participant } from "./participant";
@Table
export class ExperimentParticipant extends Model<ExperimentParticipant> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => Participant)
  @Column
  participantId: string;

  @Column
  registerDate: Date;
}
