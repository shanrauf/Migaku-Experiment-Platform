import {
  Table,
  Model,
  BelongsToMany,
  HasMany,
  Column
} from "sequelize-typescript";
import { Participant } from "./participant";
import { ExperimentParticipant } from "./experimentParticipant";
import { Survey } from "./survey";
@Table
export class Experiment extends Model<Experiment> {
  // @BelongsToMany(
  //   () => Participant,
  //   () => ExperimentParticipant
  // )
  // participants: Participant[];

  // @HasMany(() => Survey)
  // surveys: Survey[];

  @Column({ primaryKey: true })
  experimentId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  visibility: string;
}
