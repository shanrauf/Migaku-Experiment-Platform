import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { SurveyQuestion } from "./surveyQuestion";
@Table
export class Survey extends Model<Survey> {
  // @BelongsToMany(
  //   () => SurveyQuestion,
  //   () => SurveySurveyQuestion,
  //   "experimentId",
  //   "participantId"
  // )
  // surveyQuestions: SurveyQuestion[];

  @Column({ primaryKey: true })
  surveyId: string;

  // @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  @Column
  title: string;

  @Column
  surveyCategoory: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column // Change to something else?
  sectionOrder: string;

  @Column
  visibility: string;
}
