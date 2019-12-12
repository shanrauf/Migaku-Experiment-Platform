import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
@Table
export class ExperimentSurvey extends Model<ExperimentSurvey> {
  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date; // can be null too represent TBH or indefinite

  @Column(DataType.STRING(100))
  surveyCategory: string;

  @Column(DataType.STRING(25))
  visibility: string;
}
