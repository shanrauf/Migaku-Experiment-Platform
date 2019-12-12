import { DataType, Table, Column, Model } from "sequelize-typescript";
@Table
export class SurveyAnswer extends Model<SurveyAnswer> {
  @Column({ primaryKey: true })
  surveyAnswerId: string;

  // @ForeignKey(() => SurveyQuestion)
  @Column
  surveyQuestionId: string;

  // @ForeignKey(() => Experiment)
  @Column
  experimentId: string;

  // @ForeignKey(() => Survey)
  @Column
  surveyId: string;

  // @ForeignKey(() => Participant)
  @Column
  participantId: string;

  @Column(DataType.SMALLINT)
  answerSmallInt: number;

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

  @Column(DataType.JSON)
  answerJSON: string;
}
