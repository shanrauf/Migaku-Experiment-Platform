import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Requirement } from "./requirement";
@Table
export class ExperimentRequirement extends Model<ExperimentRequirement> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => Requirement)
  @Column
  requirementId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  value: string; // can be null, converted bsaed on requirement dataType
}
