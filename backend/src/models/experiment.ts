import {
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType,
  AllowNull,
  HasMany,
  Default
} from 'sequelize-typescript';
import { Participant } from './participant';
import { ExperimentParticipant } from './intermediary/experimentParticipant';
import { Requirement } from './requirement';
import { ExperimentRequirement } from './intermediary/experimentRequirement';
import { Survey } from './survey';
import { ExperimentSurvey } from './intermediary/experimentSurvey';
import { CardCollection } from './cardCollection';
import { QuestionResponse } from './questionResponse';
@Table({ modelName: 'Experiment', tableName: 'Experiments' })
export class Experiment extends Model<Experiment> {
  @BelongsToMany(
    () => Participant,
    () => ExperimentParticipant,
    'experimentId',
    'participantId'
  )
  participants: Participant[];

  @BelongsToMany(
    () => Survey,
    () => ExperimentSurvey,
    'experimentId',
    'surveyId'
  )
  surveys: Survey[];

  @BelongsToMany(
    () => Requirement,
    () => ExperimentRequirement,
    'experimentId',
    'requirementId'
  )
  requirements: Requirement[];

  @HasMany(() => QuestionResponse, 'experimentId')
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection)
  cardCollections: CardCollection[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  experimentId: string;

  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @Column
  startDate: Date;

  @AllowNull(true)
  @Column
  endDate: Date;

  @Column(DataType.STRING(25))
  visibility: string;
}
