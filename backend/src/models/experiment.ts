import {
  Table,
  Model,
  BelongsToMany,
  HasMany,
  Column
} from "sequelize-typescript";
import { Participant } from "./participant";
import { ExperimentParticipant } from "./experimentParticipant";
import { SurveyQuestion } from "./surveyQuestion";
import { ExperimentSurveyQuestion } from "./experimentSurveyQuestion";
import { DataQuestion } from "./dataQuestion";
import { ExperimentDataQuestion } from "./experimentDataQuestion";
@Table
export class Experiment extends Model<Experiment> {
  @BelongsToMany(
    () => Participant,
    () => ExperimentParticipant,
    "experimentId",
    "participantId"
  )
  participants: Participant[];

  @BelongsToMany(
    () => SurveyQuestion,
    () => ExperimentSurveyQuestion,
    "experimentId",
    "surveyQuestionId"
  )
  surveyQuestions: SurveyQuestion[];

  @BelongsToMany(
    () => DataQuestion,
    () => ExperimentDataQuestion,
    "experimentId",
    "dataQuestionId"
  )
  dataQuestions: DataQuestion[];

  // @HasMany(() => Survey)
  // surveys: Survey[];

  @Column({ primaryKey: true })
  experimentId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  visibility: string;
}
