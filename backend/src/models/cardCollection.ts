import {
  DataType,
  Table,
  Column,
  Model,
  BelongsTo
} from "sequelize-typescript";
import { Survey } from "./survey";

@Table
export class CardCollection extends Model<CardCollection> {
  @BelongsTo(() => Survey, "surveyId")
  survey: Survey;

  @Column(DataType.STRING(255))
  cardCollectionId: string;

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
