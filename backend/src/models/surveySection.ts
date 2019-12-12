import { Table, Column, Model } from "sequelize-typescript";

@Table
export class SurveySection extends Model<SurveySection> {
  @Column({ primaryKey: true })
  sectionId: string;

  @Column
  surveyId: string;

  @Column
  title: string;

  @Column
  description: string;
}
