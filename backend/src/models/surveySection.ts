import { Table, Column, Model } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table
export class SurveySection extends Model<SurveySection> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  sectionId: string;

  // foreign key
  @Column(DataType.STRING(255))
  surveyId: string;

  @Column(DataType.TINYINT)
  sectionOrder: number;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.STRING(1500))
  description: string;
}
