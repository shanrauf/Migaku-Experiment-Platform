import { Table, Model, BelongsToMany, Column } from "sequelize-typescript";
import { Participant } from "./participant";
import { ExperimentParticipant } from "./experimentParticipant";

@Table
export class Experiment extends Model<Experiment> {
  // @BelongsToMany(
  //   () => Participant,
  //   () => ExperimentParticipant
  // )
  // participants: Participant[];

  @Column
  experimentId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  visibility: string;
}
