import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class Survey extends Model<Survey> {
  @Column
  surveyId: string;

  @Column
  experimentId: string;

  @Column
  title: string;

  @Column
  surveyCategoory: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column // Change to something else?
  sectionOrder: string;

  @Column
  visibility: string;
}
