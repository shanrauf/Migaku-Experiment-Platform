import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentSurvey } from "./experimentSurvey";
import { Question } from "./question";
import { SurveyQuestion } from "./surveyQuestion";
import { CardCollection } from "./cardCollection";
@Table
export class Survey extends Model<Survey> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentSurvey,
    "surveyId",
    "experimentId"
  )
  surveys: Survey[];

  @BelongsToMany(
    () => Question,
    () => SurveyQuestion,
    "surveyId",
    "questionId"
  )
  questions: Question[];

  @HasMany(() => CardCollection, "surveyId")
  cardCollections: CardCollection[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  surveyId: string;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.STRING(1500))
  description: string;
}
