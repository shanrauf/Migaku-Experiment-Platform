import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Requirement extends Model<Requirement> {
  @Column({ primaryKey: true })
  requirementId: string;

  @Column
  key: string;

  @Column
  dataType: string;

  @Column
  image: string; // URL, can be null
}
