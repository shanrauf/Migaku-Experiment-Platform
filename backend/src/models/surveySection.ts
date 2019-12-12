import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey
} from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { Survey } from "./survey";

@Table({ modelName: "SurveySection", tableName: "surveysections" })
export class SurveySection extends Model<SurveySection> {
  toString() {
    return "SurveySection";
  }
  @Column({ type: DataType.STRING(255), primaryKey: true })
  sectionId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @Column(DataType.TINYINT)
  sectionOrder: number;

  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;
}
