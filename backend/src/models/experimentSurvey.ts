import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
@Table
export class ExperimentSurvey extends Model<ExperimentSurvey> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date; // can be null too represent TBH or indefinite

  @Column
  surveyCategoory: string;

  @Column
  visibility: string;
}
