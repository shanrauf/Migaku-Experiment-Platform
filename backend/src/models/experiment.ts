import { Table, Model, BelongsToMany, Column } from "sequelize-typescript";
import { Participant } from "./participant";
import { ExperimentParticipant } from "./experimentParticipant";
import { Requirement } from "./requirement";
import { ExperimentRequirement } from "./experimentRequirement";
@Table
export class Experiment extends Model<Experiment> {
  @BelongsToMany(
    () => Participant,
    () => ExperimentParticipant,
    "experimentId",
    "participantId"
  )
  participants: Participant[];

  @BelongsToMany(
    () => Requirement,
    () => ExperimentRequirement,
    "experimentId",
    "requirementId"
  )
  requirements: Requirement[];

  @Column({ primaryKey: true })
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
