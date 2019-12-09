import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class DataQuestion extends Model<DataQuestion> {
  @Column
  sectioonId: string;

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
