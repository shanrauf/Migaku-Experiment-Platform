import { DataType, Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class Cards extends Model<Cards> {
  @Column
  userId: string;

  @Column
  experimentId: string;

  @Column
  surveyId: string;

  @Column
  dataQuestionId: string;

  @Column(DataType.JSON)
  cards: string;
}
