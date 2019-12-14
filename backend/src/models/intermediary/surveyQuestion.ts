import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";
import { Survey } from "../survey";
import { Question } from "../question";
@Table({ modelName: "SurveyQuestion", tableName: "SurveyQuestions" })
export class SurveyQuestion extends Model<SurveyQuestion> {
  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;
}
