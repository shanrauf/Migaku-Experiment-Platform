import { Table, Column, Model, DataType } from "sequelize-typescript";
@Table
export class Survey extends Model<Survey> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  surveyId: string;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.STRING(1500))
  description: string;
}
