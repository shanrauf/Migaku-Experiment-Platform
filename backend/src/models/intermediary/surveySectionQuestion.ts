import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull
} from 'sequelize-typescript';
import { SurveySection } from '../surveySection';
import { Question } from '../question';
@Table({
  modelName: 'SurveySectionQuestion',
  tableName: 'SurveySectionQuestions'
})
export class SurveySectionQuestion extends Model<SurveySectionQuestion> {
  @ForeignKey(() => SurveySection)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  sectionId: string;

  @ForeignKey(() => Question)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  questionId: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
  questionOrder: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
