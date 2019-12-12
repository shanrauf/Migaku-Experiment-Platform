import { DataType, Table, Column, Model } from "sequelize-typescript";

@Table
export class CardCollection extends Model<CardCollection> {
  // id primary key autoincrement, perhaps add explicitly even though sequelize auto-adds

  @Column
  dataQuestionId: string;

  // foreign key
  @Column
  experimentId: string;

  // foreign key
  @Column
  surveyId: string;

  // foreign key
  @Column
  participantId: string;

  @Column(DataType.JSON)
  cards: string;
}
