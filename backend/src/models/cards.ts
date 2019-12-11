import { DataType, Table, Column, Model, HasMany } from "sequelize-typescript";

@Table // add DefineOptions for tableName/modelName cuz will minify code
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
