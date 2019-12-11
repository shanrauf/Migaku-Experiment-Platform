import {
  ForeignKey,
  Table,
  Column,
  Model,
  HasMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { DataQuestion } from "./dataQuestion";
@Table
export class ExperimentDataQuestion extends Model<ExperimentDataQuestion> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => DataQuestion)
  @Column
  dataQuestionId: string;
}
