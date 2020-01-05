import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  UpdatedAt,
  CreatedAt,
  AllowNull
} from 'sequelize-typescript';
import { Question } from '../question';
import { Experiment } from '../experiment';
@Table({ modelName: 'ExperimentQuestion', tableName: 'ExperimentQuestions' })
export class ExperimentQuestion extends Model<ExperimentQuestion> {
  @ForeignKey(() => Experiment)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  experimentId!: string;

  @ForeignKey(() => Question)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  questionId!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
