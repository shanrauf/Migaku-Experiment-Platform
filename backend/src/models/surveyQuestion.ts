import {
  Table,
  Column,
  Model,
  HasOne,
  ForeignKey,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentSurveyQuestion } from "./experimentSurveyQuestion";
@Table
export class SurveyQuestion extends Model<SurveyQuestion> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentSurveyQuestion,
    "surveyQuestionId",
    "experimentId"
  )
  experiments: Experiment[];

  // @BelongsToMany(() => Survey, () => SurveyQuestionSurvey)
  // surveys: Survey[];

  // @HasOne(() => SurveyAnswer)
  // surveyAnswer: SurveyAnswer;

  // @HasOne(() => SurveySection)
  // surveySection: SurveySection;

  @Column({ primaryKey: true })
  surveyQuestionId: string;

  // @ForeignKey(() => SurveySection)
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
