import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType
} from "sequelize-typescript";
import { Participant } from "./participant";
import { ExperimentParticipant } from "./experimentParticipant";
import { Requirement } from "./requirement";
import { ExperimentRequirement } from "./experimentRequirement";
import { Survey } from "./survey";
import { ExperimentSurvey } from "./experimentSurvey";
@Table
export class Experiment extends Model<Experiment> {
  @BelongsToMany(
    () => Participant,
    () => ExperimentParticipant,
    "experimentId",
    "participantId"
  )
  participants: Participant[];

  @BelongsToMany(
    () => Survey,
    () => ExperimentSurvey,
    "experimentId",
    "surveyId"
  )
  surveys: Survey[];

  @BelongsToMany(
    () => Requirement,
    () => ExperimentRequirement,
    "experimentId",
    "requirementId"
  )
  requirements: Requirement[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  experimentId: string;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.STRING(1500))
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column(DataType.STRING(25))
  visibility: string;
}
