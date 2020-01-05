import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
  DataType,
  UpdatedAt,
  CreatedAt,
  DefaultScope
} from 'sequelize-typescript';

import { Survey } from './survey';

@DefaultScope(() => ({
  attributes: ['sectionId', 'surveyId', 'sectionNumber', 'title', 'description']
}))
@Table({ modelName: 'SurveySection', tableName: 'SurveySections' })
export class SurveySection extends Model<SurveySection> {
  @ForeignKey(() => Survey)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  surveyId: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255), primaryKey: true })
  sectionId: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
  sectionNumber: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
