import { Table, Column, Model, HasOne } from "sequelize-typescript";
import { DataAnswer } from "./dataAnswer";
@Table
export class DataQuestion extends Model<DataQuestion> {
  @HasOne(() => DataAnswer)
  dataAnswer: DataAnswer;

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
