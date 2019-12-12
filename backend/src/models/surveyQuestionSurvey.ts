import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Survey } from "./survey";
import { SurveyQuestion } from "./surveyQuestion";
@Table
export class SurveyQuestionSurvey extends Model<SurveyQuestionSurvey> {
  @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  @ForeignKey(() => SurveyQuestion)
  @Column
  surveyQuestionId: number;
}
