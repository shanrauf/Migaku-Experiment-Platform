import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  DefaultScope
} from 'sequelize-typescript';
import { Experiment } from './experiment';
import { ExperimentRequirement } from './intermediary/experimentRequirement';

@DefaultScope(() => ({
  attributes: ['requirementId', 'dataType', 'image']
}))
@Table({ modelName: 'Requirement', tableName: 'Requirements' })
export class Requirement extends Model<Requirement> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  requirementId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  dataType!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title!: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @AllowNull(true)
  @Column(DataType.STRING(1000))
  image: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  value!: string;

  get requirementValue(): string | number | boolean {
    switch (this.dataType) {
      case 'string':
        return this.value;
      case 'number':
        return parseInt(this.value, 10);
      case 'float':
        return parseFloat(this.value);
      case 'boolean':
        if (this.value === 'true') {
          return true;
        }
        return false;
    }
  }
  set requirementValue(val) {
    if (val === null) {
      throw new Error("'value' cannot be null");
    } else if (typeof val === 'undefined') {
      throw new Error("'value' cannot be undefined");
    }
    this.value = String(val);
  }

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(
    () => Experiment,
    () => ExperimentRequirement,
    'requirementId',
    'experimentId'
  )
  experiments: Experiment[];
}
