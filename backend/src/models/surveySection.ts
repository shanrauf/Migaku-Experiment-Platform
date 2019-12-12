import { Table, Column, Model } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table
export class SurveySection extends Model<SurveySection> {
  @Column({ primaryKey: true })
  sectionId: string;

  // foreign key
  @Column
  surveyId: string;

  @Column(DataType.SMALLINT)
  order: number;

  @Column
  title: string;

  @Column
  description: string;
}
