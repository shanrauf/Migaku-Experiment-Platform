import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
, DataType } from "sequelize-typescript";

import { Survey } from './survey';

@Table({ modelName: 'SurveySection', tableName: 'SurveySections' })
export class SurveySection extends Model<SurveySection> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  sectionId: string;

  @ForeignKey(() => Survey)
  @Column(DataType.STRING(255))
  surveyId: string;

  @Column(DataType.TINYINT)
  sectionNumber: number;

  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;
}
