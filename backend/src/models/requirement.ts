import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
  AllowNull,
  Unique
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentRequirement } from "./intermediary/experimentRequirement";

@Table({ modelName: "Requirement", tableName: "Requirements" })
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

  @Unique
  @Column(DataType.STRING(100))
  key: string;

  @Column(DataType.STRING(50))
  dataType: string;

  @AllowNull(true)
  @Column(DataType.STRING(1000))
  image: string; // URL, can be null
}
