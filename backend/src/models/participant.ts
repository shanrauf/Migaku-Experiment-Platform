import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentParticipant } from "./experimentParticipant";

@Table
export class Participant extends Model<Participant> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentParticipant
  )
  experiments: Experiment[];

  @Column
  participantId: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column
  discordUsername: string;

  @Column(DataType.SMALLINT)
  age: number;

  @Column
  sex: string;
}
