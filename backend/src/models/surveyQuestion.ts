import { Table, Column, Model } from "sequelize-typescript";
@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  @Column({ primaryKey: true })
  surveyQuestionId: string;

  @Column
  questionType: string;

  @Column
  answerType: string;

  @Column
  label: string;

  @Column
  rules: string;

  @Column
  items: string;

  @Column
  required: Boolean;

  @Column
  note: string;

  @Column
  question: string;
}
