import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Experiment } from '../experiment';
import { Survey } from '../survey';
import { SurveyResponse } from '../surveyResponse';
@Table({ modelName: 'ExperimentSurvey', tableName: 'ExperimentSurveys' })
export class ExperimentSurvey extends Model<ExperimentSurvey> {
  @HasMany(() => SurveyResponse)
  surveyResponses: SurveyResponse[];

  @ForeignKey(() => Experiment)
  @Column(DataType.STRING(255))
  experimentId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @Column
  startDate: Date;

  @AllowNull(true)
  @Column
  endDate: Date; // can be null to represent TBD or indefinite

  @Column(DataType.STRING(100))
  surveyCategory: string;

  @Column(DataType.STRING(25))
  visibility: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
