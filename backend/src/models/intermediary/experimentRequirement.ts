import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Experiment } from '../experiment';
import { Requirement } from '../requirement';
@Table({
  modelName: 'ExperimentRequirement',
  tableName: 'ExperimentRequirements'
})
export class ExperimentRequirement extends Model<ExperimentRequirement> {
  @ForeignKey(() => Experiment)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Requirement)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  requirementId: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  value: string; // can be null, converted based on requirement dataType

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
