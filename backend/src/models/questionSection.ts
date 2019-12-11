import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class QuestionSection extends Model<QuestionSection> {
  @Column({ primaryKey: true })
  sectionId: string;

  @Column
  surveyId: string;

  @Column
  title: string;

  @Column
  description: string;
}
