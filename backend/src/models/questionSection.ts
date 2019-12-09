import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class QuestionSection extends Model<QuestionSection> {
  @Column
  sectionId: string;

  @Column
  title: string;

  @Column
  description: string;
}
