import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType
} from "sequelize-typescript";
import { SurveySection } from "../surveySection";
import { Question } from "../question";
@Table({
  modelName: "SurveySectionQuestion",
  tableName: "surveysectionquestions"
})
export class SurveySectionQuestion extends Model<SurveySectionQuestion> {
  toString() {
    return "SurveySectionQuestion";
  }
  @ForeignKey(() => SurveySection)
  @Column(DataType.STRING(255))
  sectionId: string;

  @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;

  @Column(DataType.TINYINT)
  questionOrder: number;
}
