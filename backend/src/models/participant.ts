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
    () => ExperimentParticipant,
    "participantId",
    "experimentId"
  )
  experiments: Experiment[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  participantId: string;

  @Column(DataType.STRING(100))
  email: string;

  @Column(DataType.STRING(60))
  password: string;

  @Column(DataType.STRING(100))
  name: string;

  @Column(DataType.STRING(100))
  discordUsername: string;

  @Column(DataType.TINYINT)
  age: number;

  @Column(DataType.STRING(20))
  sex: string;
}
