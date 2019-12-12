import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Requirement } from "./requirement";
@Table
export class ExperimentRequirement extends Model<ExperimentRequirement> {
  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Requirement)
  @Column(DataType.STRING(255))
  requirementId: string;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.STRING(1500))
  description: string;

  @Column(DataType.STRING(255))
  value: string; // can be null, converted based on requirement dataType
}
