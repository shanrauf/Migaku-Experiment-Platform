import { ForeignKey, Table, Column, Model } from "sequelize-typescript";
import { Survey } from "./survey";
import { Question } from "./question";
@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  @ForeignKey(() => Question)
  @Column
  questionId: string;
}
