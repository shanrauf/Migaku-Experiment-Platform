import {
  Table,
  Column,
  Model,
  HasOne,
  BelongsToMany
} from "sequelize-typescript";
import { DataAnswer } from "./dataAnswer";
@Table
export class DataQuestion extends Model<DataQuestion> {
  @HasOne(() => DataAnswer, "dataQuestionId")
  dataAnswer: DataAnswer;

  @Column({ primaryKey: true })
  dataQuestionId: string;

  @Column
  label: string;

  @Column
  rules: string;

  @Column
  questionType: string;

  @Column
  answerType: string;

  @Column
  question: string;
}
