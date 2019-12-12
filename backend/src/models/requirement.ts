import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentRequirement } from "./experimentRequirement";

@Table
export class Requirement extends Model<Requirement> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentRequirement,
    "requirementId",
    "experimentId"
  )
  experiments: Experiment[];

  @Column({ primaryKey: true })
  requirementId: string;

  @Column
  key: string;

  @Column
  dataType: string;

  @Column
  image: string; // URL, can be null
}
