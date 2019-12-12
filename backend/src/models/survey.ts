import { Table, Column, Model } from "sequelize-typescript";
@Table
export class Survey extends Model<Survey> {
  @Column({ primaryKey: true })
  surveyId: string;

  @Column
  title: string;

  @Column
  description: string;
}
