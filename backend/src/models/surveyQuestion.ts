import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  @Column
  sectionId: string;

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
