import {
  Table,
  Column,
  Model,
  HasOne,
  ForeignKey,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { SurveyAnswer } from "./surveyAnswer";
import { QuestionSection } from "./questionSection";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
import { ExperimentParticipant } from "./experimentParticipant";
@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  // @BelongsToMany(
  //   () => Experiment,
  //   () => ExperimentParticipant
  // )
  // experiments: Experiment[];

  // @BelongsToMany(() => Survey, () => SurveyQuestionSurvey)
  // surveys: Survey[];

  // @HasOne(() => SurveyAnswer)
  // surveyAnswer: SurveyAnswer;

  // @HasOne(() => QuestionSection)
  // questionSection: QuestionSection;

  // @ForeignKey(() => QuestionSection)
  @Column
  sectionId: string;

  @Column
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
