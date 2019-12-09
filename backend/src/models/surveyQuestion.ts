import {
  Table,
  Column,
  Model,
  HasOne,
  ForeignKey,
  HasMany
} from "sequelize-typescript";
import { SurveyAnswer } from "./surveyAnswer";
import { QuestionSection } from "./questionSection";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  @HasMany(() => Experiment)
  experiments: Experiment[];

  @HasMany(() => Survey)
  surveys: Survey[];

  @HasOne(() => SurveyAnswer)
  surveyAnswer: SurveyAnswer;

  @ForeignKey(() => QuestionSection)
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
