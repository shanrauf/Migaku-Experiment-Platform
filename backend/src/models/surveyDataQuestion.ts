import {
  ForeignKey,
  Table,
  Column,
  Model,
  HasMany
} from "sequelize-typescript";
import { DataQuestion } from "./dataQuestion";
import { Survey } from "./survey";
@Table
export class SurveyDataQuestion extends Model<SurveyDataQuestion> {
  @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  @ForeignKey(() => DataQuestion)
  @Column
  dataQuestionId: string;
}
