import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  AllowNull
} from 'sequelize-typescript';
import { Experiment } from '../experiment';
import { Survey } from '../survey';
@Table({ modelName: 'ExperimentSurvey', tableName: 'ExperimentSurveys' })
export class ExperimentSurvey extends Model<ExperimentSurvey> {
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
}
