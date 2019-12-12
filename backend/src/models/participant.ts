import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType,
  AllowNull,
  HasMany,
  Unique
} from "sequelize-typescript";
import { Experiment } from "./experiment";
import { ExperimentParticipant } from "./experimentParticipant";
import { CardCollection } from "./cardCollection";
import { QuestionResponse } from "./questionResponse";

@Table({ modelName: "Participant", tableName: "participants" })
export class Participant extends Model<Participant> {
  @BelongsToMany(
    () => Experiment,
    () => ExperimentParticipant,
    "participantId",
    "experimentId"
  )
  experiments: Experiment[];

  @HasMany(() => QuestionResponse, "participantId")
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection, "participantId")
  cardCollections: CardCollection[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  participantId: string;

  @Unique
  @Column(DataType.STRING(100))
  email: string;

  @Column(DataType.STRING(60))
  password: string;

  @Column(DataType.STRING(100))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  discordUsername: string;

  @Column(DataType.TINYINT)
  age: number;

  @Column(DataType.STRING(20))
  sex: string;
}
