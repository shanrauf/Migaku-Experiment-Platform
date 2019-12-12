import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { DataQuestion } from "./dataQuestion";
@Table // All data questions used in an experiment
export class ExperimentDataQuestion extends Model<ExperimentDataQuestion> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => DataQuestion)
  @Column
  dataQuestionId: string;
}
