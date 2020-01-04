import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  UpdatedAt,
  CreatedAt,
  AllowNull
} from 'sequelize-typescript';
import { Survey } from '../survey';
import { Question } from '../question';
@Table({ modelName: 'SurveyQuestion', tableName: 'SurveyQuestions' })
export class SurveyQuestion extends Model<SurveyQuestion> {
  @ForeignKey(() => Survey)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  surveyId: string;

  @ForeignKey(() => Question)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  questionId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
