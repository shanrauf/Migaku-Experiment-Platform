import { Table, Column, Model } from "sequelize-typescript";
@Table
export class Question extends Model<Question> {
  @Column({ primaryKey: true })
  questionId: string;

  @Column
  key: string;

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
