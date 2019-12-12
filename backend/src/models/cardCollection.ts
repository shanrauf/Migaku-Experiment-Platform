import { DataType, Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class CardCollection extends Model<CardCollection> {
  // id primary key autoincrement

  @Column
  dataQuestionId: string;

  @Column
  experimentId: string;

  @Column
  surveyId: string;

  @Column
  participantId: string;

  @Column(DataType.JSON)
  cards: string;
}
