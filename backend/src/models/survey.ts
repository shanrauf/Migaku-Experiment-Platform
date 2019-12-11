import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany
} from "sequelize-typescript";
import { Experiment } from "./experiment";
@Table
export class Survey extends Model<Survey> {
  // @BelongsTo(() => Experiment)
  // team: Experiment;

  // @HasMany(() => ) I feel like surveys have many questions...
  // asdf: asdf[];

  @Column({ primaryKey: true })
  surveyId: string;

  // @ForeignKey(() => Experiment)
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
