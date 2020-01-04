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
  attributes: ['requirementId', 'key', 'dataType', 'image']
}))
@Table({ modelName: 'Requirement', tableName: 'Requirements' })
export class Requirement extends Model<Requirement> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  requirementId: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  key: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  dataType: string;

  @AllowNull(true)
  @Column(DataType.STRING(1000))
  image: string; // URL, can be null

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
