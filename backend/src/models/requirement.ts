import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType
} from "sequelize-typescript";
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

  @Column({ type: DataType.STRING(255), primaryKey: true })
  requirementId: string;

  @Column(DataType.STRING(100))
  key: string;

  @Column(DataType.STRING(50))
  dataType: string;

  @Column(DataType.STRING(1000))
  image: string; // URL, can be null
}
