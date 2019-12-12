import { DataType, Table, Column, Model } from "sequelize-typescript";

@Table
export class CardCollection extends Model<CardCollection> {
  // id primary key autoincrement, perhaps add explicitly even though sequelize auto-adds

  // foreign key
  @Column(DataType.STRING(255))
  experimentId: string;

  // foreign key
  @Column(DataType.STRING(255))
  surveyId: string;

  // foreign key
  @Column(DataType.STRING(255))
  participantId: string;

  @Column(DataType.JSON)
  cards: string;
}
