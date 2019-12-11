import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { SurveyQuestion } from "./surveyQuestion";
import { Experiment } from "./experiment";
import { Survey } from "./survey";
@Table
export class SurveyAnswer extends Model<SurveyAnswer> {
  // @BelongsTo(() => SurveyQuestion)
  // surveyQuestion: SurveyQuestion;

  @Column({ primaryKey: true })
  surveyAnswerId: string;

  @Column
  userId: string;

  // @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  // @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  // @ForeignKey(() => SurveyQuestion)
  @Column
  surveyQuestionId: string;

  @Column(DataType.SMALLINT)
  answerSmallint: number;

  @Column
  answerInt: number;

  @Column(DataType.FLOAT)
  answerFloat: number;

  @Column
  answerBoolean: Boolean;

  @Column(DataType.TEXT) // change?
  answerVarchar: string;

  @Column(DataType.TEXT)
  answerText: string;
}
