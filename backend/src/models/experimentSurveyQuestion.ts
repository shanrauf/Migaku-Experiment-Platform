import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Experiment } from "./experiment";
import { SurveyQuestion } from "./surveyQuestion";

@Table // All survey questions used in an experiment
export class ExperimentSurveyQuestion extends Model<ExperimentSurveyQuestion> {
  @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @ForeignKey(() => SurveyQuestion)
  @Column
  surveyQuestionId: string;
}
