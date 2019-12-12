import {
  Table,
  Column,
  Model,
  HasOne,
  BelongsToMany
} from "sequelize-typescript";
import { DataAnswer } from "./dataAnswer";
import { Experiment } from "./experiment";
import { ExperimentDataQuestion } from "./experimentDataQuestion";
@Table
export class DataQuestion extends Model<DataQuestion> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentDataQuestion,
    "dataQuestionId",
    "experimentId"
  )
  experiments: Experiment[];

  @HasOne(() => DataAnswer, "dataQuestionId")
  dataAnswer: DataAnswer;

  @Column({ primaryKey: true })
  dataQuestionId: string;

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
